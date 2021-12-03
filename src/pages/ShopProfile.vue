<template>
  <div class="content">
    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-formA data-background-color="green"> </edit-profile-formA>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <boss-card> </boss-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";
import EditProfileFormA from "./UserProfile/EditProfileFromA";
import BossCard from "./UserProfile/BossCard";

export default {
  components: {
    BossCard,
    EditProfileFormA,
 //   UserCard,
  },
};
</script>
