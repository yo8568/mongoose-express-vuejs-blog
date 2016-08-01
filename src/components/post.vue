<template>
  <div  v-for="post in posts">
    <div class="container">
     <h1>{{ post.Title }}</h1>
      <blockquote>
      <p>{{ post.body }}</p>
      <footer>作者: <cite>{{ post.Author }}</cite> </footer>
      <footer>日期: <cite>{{ post.Date }}</cite></footer>
      </blockquote>
     <a href="/#!/edit/{{this.posts[0]._id}}" class="btn btn-warning">編輯文章</a>
  <a href="/" @click="delete" class="btn btn-danger">刪除</a>
  <a href="/" class="btn ">取消</a>
     </div>
  
  
</div>

</template>
<script>
import Post from './post.vue'

export default {
  components: { Post },
  ready () {
    this.$http.get('http://localhost:8888' + this.$route.path)
        .then(function (ret) { this.posts = ret.data })
          .then(function (err) {
            console.log(err)
          })
  },
  data () {
    return {
      posts: []
    }
  },
  events: {
  },
  methods: {
    delete: function () {
      this.$http.get('http://localhost:8888/delete/' + this.posts[0]._id)
          .then(function (err) {
            console.log(err)
            this.$route.router.go('/')
          })
    }
  }
}
</script>

