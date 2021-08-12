<template>
    <div id="menu">
    <div id="list">
    <ul>
      <li><router-link to="/">Home</router-link> |</li>
      <li><router-link to="/sign-up">Sign-up</router-link> |</li>
      <li><router-link to="/about">About</router-link> |</li>
      <li><router-link to="/profile">Profile</router-link> |</li>
      <li><router-link to="/diary">Diary</router-link> |</li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:'Nav'
}
</script>