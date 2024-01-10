<template>
  <form>
    <v-text-field
      class="mb-3"
      v-model="state.caption"
      :rules="fieldRules"
      label="Caption"
      required
      @input="v$.caption.$touch"
      @blur="v$.caption.$touch"
    ></v-text-field>

    <v-file-input
      v-model="selectedFiles"
      label="Select an image"
      @input="v$.image.$touch"
      @blur="v$.image.$touch"
      @change="previewFile"
      :rules="fieldRulesImages"
      accept="image/*"
      :clearable="false"
      :prepend-icon="null"
      :append-inner-icon="
        state.image ? ' mdi-check-circle-outline' : ' mdi-close-circle-outline'
      "
    ></v-file-input>

    <div class="mb-5">
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
      <v-btn
        @click="clearPreview"
        class="my-4 bg-wood color-sunglow ml-auto d-flex"
        >Clear</v-btn
      >
    </div>

    <v-btn
      class="mt-5"
      :loading="isSaving"
      :class="
        !state.caption || !state.image
          ? 'bg-silver color-wood'
          : ' bg-wood color-sunglow'
      "
      @click="save"
      :disabled="!state.caption || !state.image"
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
import { useVuelidate } from "@vuelidate/core";
import { email, required, requiredIf } from "@vuelidate/validators";
import { Galeri, IGaleri } from "@/models/galeri";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { POSITION, useToast } from "vue-toastification";
import { ref, Ref, onMounted } from "vue";
import { Attachment, IAttachment } from "@/models/attachment";
import { useRoute } from "vue-router";
import { galeriService } from "@/services/galeri-service";
import { attachmentService } from "@/services/attachment-service";
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
      fieldRules: [
        (value: any) => {
          if (value?.length > 0) return true;

          return "Value is required";
        },
      ],
      fieldRulesImages: [
        (value: any) => {
          console.log("value", value);

          if (value.length > 0) return true;

          return "Value is required";
        },
      ],
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
    const initialState = new Galeri();
    const toast = useToast();
    const file = ref();
    const isSaving = ref(false);
    const isFetching = ref(false);
    const route = useRoute();
    const attachment: Ref<IAttachment> = ref(new Attachment());
    let isValid = ref(false);

    const state: any = reactive({
      ...initialState,
    });

    const rules = {
      caption: { required },
      content: { required },
      image: {
        required: requiredIf(() => {
          // Adjust the logic inside the function as needed
          return true; // or any boolean condition based on your requirements
        }),
      },
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }
    const retrieveDataGaleri = async (post: any) => {
      try {
        isFetching.value = true;
        const res = await galeriService.find(post.id);
        state.id = res.id;
        state.caption = res.caption;
        state.image = res.url;
        attachment.value = res.attachment;
      } catch (error) {
        console.log("error", error);
        isFetching.value = false;
      } finally {
        isFetching.value = false;
      }
    };
    onMounted(() => {
      if (Object.keys(route.params).length > 0) {
        retrieveDataGaleri(route.params);
      }
    });
    const save = async (id: number) => {
      isSaving.value = true;
      let galeri: IGaleri = {
        id: state.id,
        caption: state.caption,
      };

      let formData = new FormData();
      formData.append("caption", galeri.caption);
      if (file.value) {
        formData.append("galleries", file.value);
      }
      if (galeri.id) {
        isFetching.value = true;

        const res = await galeriService.partialUpdate(formData, galeri.id);
        if (res) {
          toast.success("Galeri Telah Di Perbarui", {
            position: "top-right" as POSITION,
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
          isSaving.value = false;
        }
        router.replace({ path: "/galeri" });
      } else {
        isFetching.value = true;
        const res = await galeriService.create(formData);
        if (res) {
          toast.success("Galeri Berhasil Di Buat", {
            position: "top-right" as POSITION,
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
          isSaving.value = false;
        }
        router.replace({ path: "/galeri" });
      }
    };

    return {
      state,
      v$,
      clear,
      isValid,
      save,
      file,
      isSaving,
    };
  },
};
</script>
