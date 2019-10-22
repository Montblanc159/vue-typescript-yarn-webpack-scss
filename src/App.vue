<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
// import Style from './App.scss'
// import Template from './App.html'

import Render from './App.html?style=./App.scss'
//
// @Template
//
// @Style

@Render

@Component({})
export default class App extends Vue {
  @Prop({type: Number, default: 0}) start!: number
  number: number = 0

  mounted () {
    window.setInterval(() => {
      this.number++
    }, 1000)
  }
}
</script>
