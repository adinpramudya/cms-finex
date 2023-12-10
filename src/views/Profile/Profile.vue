<template>
  <v-tabs v-model="tab" bg-color="#2c3333" class="mb-3">
    <v-tab value="map">Google Map</v-tab>
    <v-tab value="two">Kontak</v-tab>
    <v-tab value="three">Disclaimer</v-tab>
    <v-tab value="four">Link Social Media</v-tab>
  </v-tabs>

  <v-card-text>
    <v-window v-model="tab">
      <v-window-item value="map">
        <div class="d-flex align-center">
          <hr width="48px" color="black" />
          <h1 class="ml-4 text-h4 font-weight-medium">Google Map</h1>
        </div>
        <v-text-field class="mb-2" label="Link URL" required></v-text-field>
        <v-btn class="mr-4 bg-wood color-sunglow"> Simpan </v-btn>
        <v-btn class="bg-wood color-sunglow"> Batalkan </v-btn>
      </v-window-item>

      <v-window-item value="two">
        <v-textarea class="mb-2" label="Alamat"></v-textarea>
        <v-text-field class="mb-2" label="Telepon" required></v-text-field>
        <v-text-field class="mb-2" label="Fax" required></v-text-field>
        <v-text-field class="mb-2" label="WhatsApp" required></v-text-field>
        <v-text-field
          label="Email address"
          placeholder="johndoe@gmail.com"
          type="email"
        ></v-text-field>
        <v-btn class="mr-4 bg-wood color-sunglow"> Simpan </v-btn>
        <v-btn class="bg-wood color-sunglow"> Batalkan </v-btn>
      </v-window-item>

      <v-window-item value="three">
        <ckeditor
          :config="editorConfig"
          :editor="editor"
          v-model="content"
        ></ckeditor>
        <v-btn class="mr-4 bg-wood mt-2 color-sunglow"> Simpan </v-btn>
        <v-btn class="bg-wood mt-2 color-sunglow"> Batalkan </v-btn>
      </v-window-item>
      <v-window-item value="four">
        <h2 class="mb-2">Instagram</h2>
        <v-text-field
          class="mb-1"
          label="Nama Platform"
          required
        ></v-text-field>
        <v-file-input
          v-model="selectedFiles"
          label="Select an image"
          :prepend-icon="null"
          prepend-inner-icon="mdi-image"
          accept="image/*"
        ></v-file-input>
        <v-text-field class="mb-1" label="Link Tautan" required></v-text-field>

        <h2 class="mb-2">Facebook</h2>
        <v-text-field
          class="mb-1"
          label="Nama Platform"
          required
        ></v-text-field>
        <v-file-input
          v-model="selectedFiles"
          label="Select an image"
          :prepend-icon="null"
          prepend-inner-icon="mdi-image"
          accept="image/*"
        ></v-file-input>
        <v-text-field class="mb-1" label="Link Tautan" required></v-text-field>

        <h2 class="mb-2">Youtube</h2>
        <v-text-field
          class="mb-1"
          label="Nama Platform"
          required
        ></v-text-field>
        <v-file-input
          v-model="selectedFiles"
          :prepend-icon="null"
          label="Select an image"
          prepend-inner-icon="mdi-image"
          accept="image/*"
        ></v-file-input>
        <v-text-field class="mb-1" label="Link Tautan" required></v-text-field>

        <v-btn class="mr-4 bg-wood color-sunglow"> Simpan </v-btn>
        <v-btn class="bg-wood color-sunglow"> Batalkan </v-btn>
      </v-window-item>
    </v-window>
  </v-card-text>
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
</style>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data: () => ({
    editor: ClassicEditor,
    editorData: "<p>Content of the editor.</p>",
    editorConfig: {
      // The configuration of the editor.
    },
    content: "",
    tab: null,
  }),
};
</script>
