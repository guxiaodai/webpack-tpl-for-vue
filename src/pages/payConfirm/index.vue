<template>
  <div class="pay-confirm-page">
    <div class="header-tip">
      <div>输入会员手机号登录，享受会员优惠</div>
      <div class="right-btn">会员登录</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../../variables.scss';

.pay-confirm-page {
  height: 100vh;
  background: $bgColor;
  & .header-tip {
    display: flex;
    height: 120px;
    background: #fff;
    padding: 0 19px;
    font-size: 26px;
    color: $fontColor1;
    justify-content: space-between;
    align-items: center;
    .right-btn {
      display: flex;
      width: 128px;
      height: 44px;
      color: $fontColor2;
      font-size: 22px;
      align-items: center;
      justify-content: center;
      background: $primaryColor;
      border-radius: 4px;
    }
  }
}
</style>

