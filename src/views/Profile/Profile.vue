<template>
  <v-tabs v-model="tab" bg-color="#2c3333" class="mb-3">
    <v-tab value="map">Google Map </v-tab>
    <v-tab value="two">Kontak</v-tab>
    <v-tab value="three">Disclaimer</v-tab>
  </v-tabs>
  <v-card-text>
    <v-window v-model="tab">
      <v-window-item value="map">
        <div class="d-flex align-center">
          <hr width="48px" color="black" />
          <h1 class="ml-4 text-h4 font-weight-medium">Google Map</h1>
        </div>
        <v-text-field
          class="mb-2"
          label="Link URL"
          required
          v-model="contactData.gmapUrl"
        ></v-text-field>
        <v-btn class="mr-4 bg-wood color-sunglow" @click="save"> Simpan </v-btn>
        <v-btn class="bg-wood color-sunglow"> Batalkan </v-btn>
      </v-window-item>

      <v-window-item value="two">
        <v-textarea
          class="mb-2"
          label="Alamat"
          v-model="contactData.address"
        ></v-textarea>
        <v-text-field
          class="mb-2"
          label="Telepon"
          required
          v-model="contactData.telephone"
        >
        </v-text-field>
        <v-text-field
          class="mb-2"
          label="Fax"
          v-model="contactData.fax"
          required
        ></v-text-field>
        <v-text-field
          class="mb-2"
          label="WhatsApp"
          v-model="contactData.whatsApp"
          required
        ></v-text-field>
        <v-text-field
          label="Email address"
          placeholder="johndoe@gmail.com"
          type="email"
          v-model="contactData.email"
        ></v-text-field>
        <v-btn class="mr-4 bg-wood color-sunglow" @click="save"> Simpan </v-btn>
        <v-btn class="bg-wood color-sunglow"> Batalkan </v-btn>
      </v-window-item>

      <v-window-item value="three">
        <ckeditor
          :config="editorConfig"
          :editor="editor"
          v-model="contactData.disclaimer"
        ></ckeditor>
        <v-btn class="mr-4 bg-wood mt-2 color-sunglow" @click="save">
          Simpan
        </v-btn>
        <v-btn class="bg-wood mt-2 color-sunglow"> Batalkan </v-btn>
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
<script lang="ts">
import { contactService, ContactService } from "@/services/contact-service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { inject } from "vue";
import { onMounted } from "vue";
import { ref, Ref } from "vue";
import { Contact, IContact } from "@/models/contact";
import router from "@/router";
import { POSITION, useToast } from "vue-toastification";
export default {
  data: () => ({
    editor: ClassicEditor as any,
    editorData: "<p>Content of the editor.</p>",
    editorConfig: {
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "alignment",
        "|",
        "numberedList",
        "bulletedList",
        "|",
        "outdent",
        "indent",
        "|",
        "link",
        "|",
        "undo",
        "redo",
        "|",
        "blockQuote",
        "highlight",
        "|",
        "horizontalLine",
        "removeFormat",
        "|",
        "specialCharacters",
        "sourceEditing",
      ],
    } as any,
    content: "",
    tab: null,
  }),

  setup() {
    const isFetching = ref(false);
    let contactData: Ref<IContact> = ref(new Contact());
    const toast = useToast();

    const retrieveDataContact = async () => {
      try {
        isFetching.value = true;
        const res = await contactService.retrieve();
        contactData.value = res.data.data[0];
        console.log("contant", contactData);
      } catch (error) {
        console.log("error", error);
        isFetching.value = false;
      } finally {
        isFetching.value = false;
      }
    };
    onMounted(() => {
      retrieveDataContact();
    });
    const save = async () => {
      if (contactData.value.id) {
        isFetching.value = true;
        const res = await contactService.partialUpdate(
          contactData.value,
          contactData.value.id
        );
        if (res) {
          toast.success("Contact Telah Di Perbarui", {
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
        }
      } else {
        isFetching.value = true;
        const res = await contactService.create(contactData.value);
        if (res) {
          toast.success("Contact Berhasil Di Buat", {
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
        }
      }
    };
    return { contactData, save };
  },
};
</script>
