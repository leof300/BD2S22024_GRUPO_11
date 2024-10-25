<script setup>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  name: 'TEST',
  data() {
    return {
      count: 0,
      greeting: "JI",
      active: false,
      assignments: [
        {name: 'uno', complete: false, id:1},
        {name: 'dos', complete: false, id:2},
        {name: 'tres', complete: false, id:3}
      ]
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    },
    toggle(){
      this.active = !this.active;
      alert("test");
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <input type="text" v-model="greeting">
  <button v-on:click="toggle">Click</button>
  <p>{{greeting}}</p>
  <button @click="increment">Count is: {{ count }}</button>

  <section>
    <ul>
      <li v-for="assignment in assignments.filter(a => !a.complete )" :key="assignment.id">
        <label>
          {{assignment.name}}
          <input type="checkbox" v-model="assignment.complete">
        </label>
      </li>
    </ul>

  </section>

  <section>
    <h2>Completed</h2>
    <ul>
      <li v-for="assignment in assignments.filter(a => a.complete )" :key="assignment.id">
        <label>
          {{assignment.name}}
          <input type="checkbox" v-model="assignment.complete">
        </label>
      </li>
    </ul>

  </section>


</template>


<style>
  html, body{
    height: 100%;
  }

  body{
    display: grid;
    place-items: center;
  }
</style>