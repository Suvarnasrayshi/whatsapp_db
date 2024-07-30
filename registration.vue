<template>
  <v-container>
    <v-form @submit.prevent="register">
      <v-text-field v-model="username" label="Username" ></v-text-field>
      <v-text-field v-model="phoneNumber" label="Phone Number" ></v-text-field>
      <v-text-field v-model="email" label="Email" type="email" ></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" ></v-text-field>
      <v-btn type="submit">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';

    const username = ref('');
    const phoneNumber = ref('');
    const email = ref('');
    const password = ref('');
    // const router = useRouter();
    const register = async () => {
      try {
        console.log("object");
        console.log("username",username.value);
        console.log("email",email.value);
        console.log("phoneNumber",phoneNumber.value);
        console.log("password",password.value);
        const response = await fetch('http://localhost:3003/registration', {
          method: 'POST',
          credentials:'include',
          headers:{
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            password: password.value,
          }),
        });
        console.log("response",response);
        if(response.ok){
        const data = await response.json();
        console.log("data",data)
        }
      } catch (error) {
        console.error(error);
      }
    };

</script>

