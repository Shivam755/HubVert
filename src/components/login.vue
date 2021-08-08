<template>
  <!-- lets use the base-card -->
  <base-card>
    <h2>Login Here</h2>
    <form>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div>
        <base-button type="submit">Login</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style>

</style>