<template>

        <form role="form"  >
            <div id="postTitle" class="form-group">
                <label for="postTitle">文章標題</label>
                <input type="text" name="postTitle" class="form-control" id="postTitle" placeholder="Title" v-model="posts[0].Title" value="{{posts[0].Title}}">
            </div>
            <div id="postAuthor" class="form-group">
                <label for="postAuthor">文章作者
    </label>
                <input type="text" class="form-control" name="postAuthor" id="postAuthor" placeholder="Author" value="{{posts[0].Author}}"
                    v-model="posts[0].Author">
            </div>
            <div id="postBody" class="form-group">
                <label for="postBody">文章內容</label>

                    <textarea type="text" name="postBody" class="form-control" rows="5" id="postBody" placeholder="Body" v-model="posts[0].body">{{posts[0].body}}</textarea>
            </div>
            <div class="form-group">
                <button @click="save()" class=" btn btn-primary" id="save">Save</button>
                <a href="/" type="button" class=" btn btn-default" id="Cancel">Cancel</a>
            </div>
        </form>

</template>
<script>
import edit from './edit.vue'

export default {
  components: { edit },
  ready () {
    this.$http.get('http://localhost:8888' + this.$route.path)
        .then(function (ret) { this.posts = ret.data })
          .then(function (err) {
            console.log(err)
          })
  },
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
      this.$http.post('http://localhost:8888' + this.$route.path, {
        Title: this.posts[0].Title,
        Author: this.posts[0].Author,
        body: this.posts[0].body
      })
      this.$route.router.go('/post/' + this.posts[0]._id)
    }
  }
}
</script>