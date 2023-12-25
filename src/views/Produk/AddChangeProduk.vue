<template>
  <form>
    <v-text-field
      class="mb-3"
      v-model="state.name"
      :rules="fieldRules"
      label="Nama"
      required
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    ></v-text-field>

    <v-textarea
      :rules="fieldRules"
      @input="v$.desc.$touch"
      @blur="v$.desc.$touch"
      required
      v-model="state.desc"
      label="Description"
    ></v-textarea>
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
      multiple
    ></v-file-input>

    <h4 class="text-h5 font-weight-medium mt-4">Preview</h4>
    <div class="mb-5">
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
    </div>

    <v-tabs v-model="currentTabIndex" class="bg-wood" style="color: white">
      <v-tab v-for="(n, index) in futureContracts" :key="n.id" :value="index">
        {{ n.codeUnix }}
      </v-tab>
    </v-tabs>
    <v-card-text class="text-center">
      <v-window v-model="currentTabIndex">
        <v-window-item
          v-for="(future, index) in futureContracts"
          :key="future.id"
          :value="future.codeUnix"
        >
          <v-text-field
            class="mb-3"
            v-model="future.code"
            :rules="fieldRules"
            label="Kode"
            required
          ></v-text-field>

          <v-text-field
            class="mb-3"
            v-model="future.contractUnit"
            label="Satuan Kontrak"
            :rules="fieldRules"
            required
          ></v-text-field>

          <v-text-field
            class="mb-3"
            v-model="future.marginPerLotNone"
            type="number"
            label="Margin Per Lot (None)"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            type="number"
            v-model="future.marginPerLotRemote"
            label="Margin Per Lot (Remote)"
          ></v-text-field>
          <v-text-field
            type="number"
            class="mb-3"
            v-model="future.marginPerLotSpot"
            label="Margin Per Lot (Spot)"
          ></v-text-field>

          <v-text-field
            class="mb-3"
            type="number"
            v-model="future.commissionPerSideLot"
            label="Komisi Per Lot Sisi"
            :rules="fieldRules"
            required
          ></v-text-field>
          <v-text-field
            class="mb-3"
            v-model="future.tradingDaysAndHours"
            label="Hari dan Jam Perdagangan"
            :rules="fieldRules"
            required
          ></v-text-field>
          <v-text-field
            class="mb-3"
            v-model="future.minimumPriceChange"
            label="Perubahan Harga Minimum"
            :rules="fieldRules"
            required
          ></v-text-field>

          <v-text-field
            class="mb-3"
            v-model="future.price"
            :rules="fieldRules"
            label="Harga"
            required
          ></v-text-field>

          <v-text-field
            class="mb-3"
            v-model="future.contractMonth"
            :rules="fieldRules"
            label="Bulan Kontrak"
            required
          ></v-text-field>
        </v-window-item>
      </v-window>
      <v-btn
        :disabled="futureContracts.length == 0"
        variant="text"
        @click="
          () => {
            futureContracts.splice(currentTabIndex, 1);
          }
        "
      >
        Remove Future Contract
      </v-btn>
      <v-divider class="mx-4" vertical></v-divider>
      <v-btn variant="text" @click="AddFutureContract">
        Add Future Contract
      </v-btn>
    </v-card-text>

    <v-btn
      class="bg-wood color-sunglow"
      @click="saveImage"
      :disabled="!validasiCheck"
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
  .error {
    color: red;
  }

  .success {
    color: green;
  }
}
.v-input__details {
  text-align: left;
}
</style>
<script lang="ts">
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, required, requiredIf } from "@vuelidate/validators";
import { Berita } from "@/models/berita";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { POSITION, useToast } from "vue-toastification";
import { ref, Ref, onMounted, watch } from "vue";
import { IProduct, Product } from "@/models/product";
import { FutureContract, IFutureContract } from "@/models/future-contract";
import { productService } from "@/services/product-service";
import { futureService } from "@/services/future-contract-service";
import { attachmentService } from "@/services/attachment-service";
import { useRoute } from "vue-router";
import { Attachment, IAttachment } from "@/models/attachment";
import router from "@/router";

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      currentTabIndex: 0,
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
      isValid: false,
    };
  },
  computed: {
    validasiCheck() {
      if (this.state.name && this.state.desc && this.state.image) {
        return true;
      }
      return false;
    },
  },

  methods: {
    validasiFuture() {
      this.isValid = this.futureContracts.some((val) => {
        return (
          val.code &&
          val.commissionPerSideLot &&
          val.contractMonth &&
          val.contractUnit &&
          val.minimumPriceChange &&
          val.price &&
          val.tradingDaysAndHours
        );
      });
    },
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
    const initialState = new Product();
    const initialStateFuture = new FutureContract();
    const futureContracts = ref<IFutureContract[]>([]);
    let isValid = ref(false);
    const route = useRoute();
    const file = ref();

    const state: any = reactive({
      ...initialState,
    });
    const stateFuture = reactive({
      ...futureContracts,
    });

    const rules = {
      name: { required },
      desc: { required },
      image: {
        required: requiredIf(() => {
          // Adjust the logic inside the function as needed
          return true; // or any boolean condition based on your requirements
        }),
      },
    };
    const rulesFuture = {
      futureContracts: {
        $each: helpers.forEach({
          code: { required },
          contractUnit: { required },
          commissionPerSideLot: { required },
          tradingDaysAndHours: { required },
          minimumPriceChange: { required },
          price: { required },
          contractMonth: { required },
        }),
      },
    };

    const v$ = useVuelidate(rules, state);
    // const vF$ = useVuelidate(validations, { futureContracts });

    const toast = useToast();
    const isFetching = ref(false);
    const attachment: Ref<IAttachment> = ref(new Attachment());

    const retrieveProduct = async (post: any) => {
      try {
        isFetching.value = true;
        const res = await productService.find(post.id);
        state.id = res.id;
        state.name = res.name;
        state.desc = res.desc;
        state.image = res.attachment.url;
        attachment.value = res.attachment;

        if (res.FuturesContract.length > 0) {
          res.FuturesContract.forEach((val, index) => {
            let futureContract: IFutureContract = new FutureContract();

            futureContract.code = val.code;
            futureContract.codeUnix = val.code;
            futureContract.commissionPerSideLot = val.commissionPerSideLot;
            futureContract.contractMonth = val.contractMonth;
            futureContract.contractUnit = val.contractUnit;
            futureContract.id = val.id;
            futureContract.marginPerLotNone = val.marginPerLotNone;
            futureContract.marginPerLotRemote = val.marginPerLotRemote;
            futureContract.marginPerLotSpot = val.marginPerLotSpot;
            futureContract.minimumPriceChange = val.minimumPriceChange;
            futureContract.price = val.price;
            futureContract.tradingDaysAndHours = val.tradingDaysAndHours;
            futureContracts.value.push(futureContract);
          });
        } else {
          AddFutureContract();
        }

        console.log("ress", futureContracts);
      } catch (error) {
        console.log("error", error);
        isFetching.value = false;
      } finally {
        isFetching.value = false;
      }
    };

    const AddFutureContract = () => {
      let futureContract: IFutureContract = {
        codeUnix: `NewFuture${futureContracts.value.length}`,
      };
      futureContracts.value.push(futureContract);
    };

    onMounted(() => {
      if (Object.keys(route.params).length > 0) {
        retrieveProduct(route.params);
      }
    });

    const saveFuture = async (future: IFutureContract) => {
      if (future.id) {
        isFetching.value = true;
        const res = await futureService.partialUpdate(future, future.id);
        if (res.data) {
          toast.success("Product Telah Di Perbarui", {
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
        const res = await futureService.create(future);
        if (res.data) {
          toast.success("Product Berhasil Di Buat", {
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

    const save = async (id?: number) => {
      let product: IProduct = {
        id: state.id,
        name: state.name,
        desc: state.desc,
        attachmentId: id,
      };
      console.log("product", product);

      if (product.id) {
        isFetching.value = true;
        const res = await productService.partialUpdate(product, product.id);
        if (res.data) {
          futureContracts.value.forEach((val) => {
            let future: any = {
              code: val.code,
              codeUnix: val.code,
              commissionPerSideLot: val.commissionPerSideLot,
              contractMonth: val.contractMonth,
              contractUnit: val.contractUnit,
              id: val.id,
              marginPerLotNone: val.marginPerLotNone,
              marginPerLotRemote: val.marginPerLotRemote,
              marginPerLotSpot: val.marginPerLotSpot,
              minimumPriceChange: val.minimumPriceChange,
              price: val.price,
              tradingDaysAndHours: val.tradingDaysAndHours,
              productId: res.data.id,
            };
            saveFuture(future);
          });
          router.replace({ path: "/produk" });
        }
      } else {
        let formData: any = new FormData();
        if (file.value) {
          formData.append("attachment", file.value);
          formData.append("name", state.name);
          formData.append("desc", state.desc);
        }
        isFetching.value = true;
        const res = await productService.create(formData);
        if (res.data) {
          futureContracts.value.forEach((val) => {
            let future: any = {
              code: val.code,
              codeUnix: val.code,
              commissionPerSideLot: val.commissionPerSideLot,
              contractMonth: val.contractMonth,
              contractUnit: val.contractUnit,
              id: val.id,
              marginPerLotNone: val.marginPerLotNone,
              marginPerLotRemote: val.marginPerLotRemote,
              marginPerLotSpot: val.marginPerLotSpot,
              minimumPriceChange: val.minimumPriceChange,
              price: val.price,
              tradingDaysAndHours: val.tradingDaysAndHours,
              productId: res.data.id,
            };
            saveFuture(future);
          });
          router.replace({ path: "/produk" });
        }
      }
    };

    const saveImage = async () => {
      if (file.value) {
        let formData = new FormData();
        formData.append("attachment", file.value);
        if (attachment.value.id) {
          const res = await attachmentService.update(
            formData,
            attachment.value.id
          );
          if (res) {
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
      stateFuture,
      isValid,
      save,
      AddFutureContract,
      futureContracts,
      file,
      saveImage,
    };
  },
};
</script>
