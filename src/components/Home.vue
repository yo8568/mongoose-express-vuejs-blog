<template>
    <div>
        <a type="button" class="btn btn-info" href="/#!/create">發表文章</a>
    </div>
    <table class="table" id="listall">

        <thead>
            <tr>
                <th>日期</th>
                <th>文章標題</th>
                <th>作者{{message}}</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="post in posts">
                <th><a href="/#!/post/{{post._id}}">{{post.Date}}</a></th>
                <th><a href="/#!/post/{{post._id}}">{{post.Title}}</a></th>
                    
                <th>{{post.Author}}</th>
            </tr>

        </tbody>
    </table>

</template>
<script>
import Home from './Home.vue'

export default {
  components: { Home },
  ready () {
    this.$http.get('http://localhost:8888/find')
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
  }
}
</script>
