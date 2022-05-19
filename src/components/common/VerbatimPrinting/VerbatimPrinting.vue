<template>
  <div class="verbatim-printing-container">
    <div class="verbatim-printing-title">{{ title }}</div>
    <div class="verbatim-printing-words">
      <vue-typed-js
        :strings="words"
        :loop="true"
        :typeSpeed="100"
        :backSpeed="50"
      >
        <span class="typing"></span>
      </vue-typed-js>
    </div>
  </div>
</template>

<script>
import { getTitleRandom } from '@api/verbatimPrinting'

export default {
  name: 'VerbatimPrinting',
  created() {
    this.getTitleRandomData()
  },
  data() {
    return {
      title: '',
      words: [
        '山路曲折盘旋, 但毕竟朝着顶峰延伸',
        '从来没有真正的绝境, 只有心灵的迷途',
        '海浪为劈风斩浪的航船践行，为随波逐流的轻舟送葬',
        '沟潭之水, 凝滞沉闷, 飞瀑之流, 奋迅高亢——同是为水, 性却异, 前者满足安逸, 后者进取不已',
        '花开堪折直须折，莫待无花空折枝',
        '驾驭命运的舵是奋斗。不抱有一丝幻想，不放弃一点机会，不停止一日努力'
      ]
    }
  },
  methods: {
    async getTitleRandomData() {
      const { content } = await getTitleRandom()
      this.title = content
    }
  }
}
</script>

<style scoped lang="less">
.verbatim-printing-container {
  width: 100%;
  .verbatim-printing-title {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 40px;
    margin-bottom: 30px;
  }
  .verbatim-printing-words {
    width: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 300;
    display: flex;
    justify-content: center;
  }
}
</style>
