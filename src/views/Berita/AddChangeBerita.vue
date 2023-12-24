<template>
  <form>
    <v-text-field
      class="mb-3"
      v-model="state.title"
      :error-messages="v$.title.$errors.map((e) => e.$message)"
      label="Judul"
      required
      @input="v$.title.$touch"
      @blur="v$.title.$touch"
    ></v-text-field>

    <v-file-input
      v-model="selectedFiles"
      label="Select an image"
      @input="v$.image.$touch"
      @blur="v$.image.$touch"
      @change="previewFile"
      :error-messages="v$.image.$errors.map((e) => e.$message)"
      accept="image/*"
      :clearable="false"
      :prepend-icon="null"
      :append-inner-icon="
        state.image ? ' mdi-check-circle-outline' : ' mdi-close-circle-outline'
      "
    ></v-file-input>

    <h4 class="text-h5 font-weight-medium">Preview</h4>
    <v-img
      style="border: 1px dashed #ccc"
      :src="state.image"
      alt="Image Preview"
      max-width="100%"
      min-height="200px"
      max-height="200px"
      margin-top="20px"
    ></v-img>
    <v-btn @click="clearPreview" class="my-4 bg-wood color-sunglow"
      >Clear</v-btn
    >
    <ckeditor
      :error-messages="v$.content.$errors.map((e) => e.$message)"
      :config="editorConfig"
      @input="checkValidasi"
      @blur="checkValidasi"
      :editor="editor"
      v-model="state.content"
    ></ckeditor>

    <v-btn
      class="mt-5 bg-wood color-sunglow"
      @click="saveImage"
      :disabled="!state.title || !state.image || !state.content"
    >
      submit
    </v-btn>
  </form>
</template>
<style lang="scss">
.ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
.ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
  max-height: 300px;
  height: 300px;
}
.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  max-height: 300px !important;
  height: 300px !important;
}
.ck.ck-editor {
  border: none;
  &.invalid {
    border: 1px solid red;
  }
}
</style>
<script lang="ts">
import { reactive } from "vue";
import { postService, PostService } from "@/services/post-service";
import { attachmentService } from "@/services/attachment-service";
import { useVuelidate } from "@vuelidate/core";
import { email, required, requiredIf } from "@vuelidate/validators";
import { Berita, IBerita } from "@/models/berita";
import { Attachment, IAttachment } from "@/models/attachment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useToast } from "vue-toastification";
import { ref, Ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      selectedFiles: [],
      file: null,
    };
  },
  methods: {
    previewFile(e) {
      if (this.selectedFiles.length === 0) {
        this.state.image = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.state.image = e.target.result;
      };
      this.file = e.target.files[0];

      reader.readAsDataURL(this.selectedFiles[0]);
    },
    clearPreview() {
      this.selectedFiles = [];
      this.state.image = null;
    },
  },

  setup() {
    const isFetching = ref(false);
    const toast = useToast();
    const file = ref();
    let initialState = new Berita();
    let isValid = ref(false);
    const route = useRoute();
    const currentUser = ref();
    const attachment: Ref<IAttachment> = ref(new Attachment());

    let state = reactive({
      ...initialState,
    });

    const rules = {
      title: { required },
      content: { required },
      image: {
        required: requiredIf(function (nestedModel) {
          return nestedModel == null;
        }),
      },
      items: { required },
      checkbox: { required },
    };

    const checkValidasi = () => {
      if (state.content.length > 0) {
        isValid = true;
      } else {
        isValid = false;
      }
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    const retrieveDataPosts = async (post: number) => {
      try {
        isFetching.value = true;
        const res = await postService.find(post.id);
        console.log("ress", res);
        state.id = res.id;
        state.title = res.title;
        state.image = res.attachment.url;
        attachment.value = res.attachment;
        state.content = res.content;
      } catch (error) {
        console.log("error", error);
        isFetching.value = false;
      } finally {
        isFetching.value = false;
      }
    };

    onMounted(() => {
      console.log("route", route.params);

      if (Object.keys(route.params).length > 0) {
        retrieveDataPosts(route.params);
      }
      const storedTokenString = localStorage.getItem("currentUser");
      currentUser.value = storedTokenString
        ? JSON.parse(storedTokenString)
        : null;
    });
    const save = async (id: number) => {
      let berita: IBerita = {
        id: state.id,
        content: state.content,
        status: "draft",
        title: state.title,
        attachmentId: id,
        authorId: currentUser.value.administratorId,
      };

      if (berita.id) {
        isFetching.value = true;

        const res = await postService.partialUpdate(berita, berita.id);
        if (res) {
          toast.success("Berita Telah Di Perbarui", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          router.go(-1);
        }
      } else {
        isFetching.value = true;
        const res = await postService.create(berita);
        if (res) {
          toast.success("Berita Berhasil Di Buat", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
          router.go(-1);
        }
      }
    };

    const saveImage = async () => {
      if (file.value) {
        let formData = new FormData();
        formData.append("attachment", file.value);
        if (attachment.value.id) {
          const res = await attachmentService.partialUpdate(formData);
          if (res) {
            save(res.data.id);
          }
        } else {
          const res = await attachmentService.create(formData);
          if (res) {
            console.log("res", res);
            save(res.data.id);
          }
        }
      } else {
        save(attachment.value.id);
      }
    };

    return {
      state,
      v$,
      clear,
      isValid,
      checkValidasi,
      save,
      saveImage,
      file,
    };
  },
};
</script>
