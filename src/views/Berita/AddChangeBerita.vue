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
      multiple
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
      @click="save"
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
<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required, requiredIf } from "@vuelidate/validators";
import { Berita } from "@/models/berita";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useToast } from "vue-toastification";
import { ref } from "vue";
export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      selectedFiles: [],
    };
  },
  methods: {
    previewFile() {
      if (this.selectedFiles.length === 0) {
        this.state.image = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.state.image = e.target.result;
      };

      reader.readAsDataURL(this.selectedFiles[0]);
    },
    clearPreview() {
      this.selectedFiles = [];
      this.state.image = null;
    },
  },
  setup() {
    const initialState = new Berita();
    let isValid = ref(false);

    const state = reactive({
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
    const toast = useToast();
    const save = () => {
      toast.success("News Has Been Created", {
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
    };
    return {
      state,
      v$,
      clear,
      isValid,
      checkValidasi,
      save,
    };
  },
};
</script>
