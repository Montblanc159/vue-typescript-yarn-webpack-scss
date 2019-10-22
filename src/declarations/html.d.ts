declare module '*.html' {
    import Vue = require('vue')
    interface WithRender {
      <V>(options: Vue.ComponentOptions<V>): Vue.ComponentOptions<V>
      <V>(component: V): V
    }
    const withRender: WithRender
    export default withRender
}
