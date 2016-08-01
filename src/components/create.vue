<template>
<form role="form"  id="createform">
    <div class="form-group">
      <label for="postTitle">文章標題</label>
      <input type="text" class="form-control" id="postTitle" placeholder="Title" name="postTitle" v-model="posts[0].Title">
    </div>
    <div class="form-group">
      <label for="postAuthor">作者</label>
      <input type="text" class="form-control" id="postAuthor" name="postAuthor" placeholder="Author"  v-model="posts[0].Author">
    </div>
    <div class="form-group">
      <label for="postBody">文章內容</label>
      <textarea type="text" class="form-control" rows="5" id="postBody" name="postBody" placeholder="Body" v-model="posts[0].body" ></textarea>
    </div>
    <div class="form-group">
      <button @click='save()' class=" btn btn-primary" id="save">Save</button>
      <a href="/" type="button" class=" btn btn-default" id="Cancel">Cancel</a>
    </div>
  </form>
  </template>
  <script>
import create from './create.vue'

export default {
  components: { create },
  data () {
    return {
      posts: [
        {
          Title: '',
          Author: '',
          body: ''
        }
      ]
    }
  },
  events: {
  },
  methods: {
    save: function () {
      this.$http.post('http://localhost:8888/create', {
        Title: this.posts[0].Title,
        Author: this.posts[0].Author,
        body: this.posts[0].body
      })
      this.$route.router.go('/')
    }
  }
}

  </script>