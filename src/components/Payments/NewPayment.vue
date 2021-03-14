<template>
  <div>
    <transition>
      <div class="new-payment-root">
        <a-steps progress-dot :current="currentStep">
          <a-step title="订单信息确认" description="" />
          <a-step title="付款" description="" />
          <a-step title="支付结果" description="" />
        </a-steps>

        <template v-if="currentStep === 0">
          <div class="centered-block">
            <a-alert message="在下一步操作之前，请仔细核对下列信息" type="info" show-icon />
            <div class="info">
              <a-statistic class="info-item" title="订单内容" :value="payment_info.content" style="margin-right: 50px" />
              <a-statistic class="info-item" title="金额(CNY)" :precision="2" :value="payment_info.amount">
                <template #prefix>
                  ￥
                </template>
              </a-statistic>
              <a-statistic class="info-item" title="用户名" groupSeparator="" :value="$store.state.user.username" style="margin-right: 50px" />
            </div>
            <div class="button-block">
              <a-button type="primary" block @click="gotoPay"> 下一步 <a-icon type="right" /> </a-button>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 1">
          <div class="centered-block">
            <div class="instruction">
              请扫描二维码付款，获得Token并填入下方输入框
            </div>
            <div class="qrcode">
              <svg class="codeimg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200" viewBox="0 0 420 420">
                <desc></desc>
                <defs>
                  <rect id="p" width="12" height="12" />
                </defs>
                <g fill="#19654F">
                  <use x="12" y="12" xlink:href="#p" />
                  <use x="24" y="12" xlink:href="#p" />
                  <use x="36" y="12" xlink:href="#p" />
                  <use x="48" y="12" xlink:href="#p" />
                  <use x="60" y="12" xlink:href="#p" />
                  <use x="72" y="12" xlink:href="#p" />
                  <use x="84" y="12" xlink:href="#p" />
                  <use x="108" y="12" xlink:href="#p" />
                  <use x="132" y="12" xlink:href="#p" />
                  <use x="144" y="12" xlink:href="#p" />
                  <use x="168" y="12" xlink:href="#p" />
                  <use x="180" y="12" xlink:href="#p" />
                  <use x="204" y="12" xlink:href="#p" />
                  <use x="228" y="12" xlink:href="#p" />
                  <use x="252" y="12" xlink:href="#p" />
                  <use x="264" y="12" xlink:href="#p" />
                  <use x="276" y="12" xlink:href="#p" />
                  <use x="288" y="12" xlink:href="#p" />
                  <use x="324" y="12" xlink:href="#p" />
                  <use x="336" y="12" xlink:href="#p" />
                  <use x="348" y="12" xlink:href="#p" />
                  <use x="360" y="12" xlink:href="#p" />
                  <use x="372" y="12" xlink:href="#p" />
                  <use x="384" y="12" xlink:href="#p" />
                  <use x="396" y="12" xlink:href="#p" />
                  <use x="12" y="24" xlink:href="#p" />
                  <use x="84" y="24" xlink:href="#p" />
                  <use x="120" y="24" xlink:href="#p" />
                  <use x="132" y="24" xlink:href="#p" />
                  <use x="144" y="24" xlink:href="#p" />
                  <use x="156" y="24" xlink:href="#p" />
                  <use x="192" y="24" xlink:href="#p" />
                  <use x="204" y="24" xlink:href="#p" />
                  <use x="240" y="24" xlink:href="#p" />
                  <use x="264" y="24" xlink:href="#p" />
                  <use x="300" y="24" xlink:href="#p" />
                  <use x="324" y="24" xlink:href="#p" />
                  <use x="396" y="24" xlink:href="#p" />
                  <use x="12" y="36" xlink:href="#p" />
                  <use x="36" y="36" xlink:href="#p" />
                  <use x="48" y="36" xlink:href="#p" />
                  <use x="60" y="36" xlink:href="#p" />
                  <use x="84" y="36" xlink:href="#p" />
                  <use x="132" y="36" xlink:href="#p" />
                  <use x="156" y="36" xlink:href="#p" />
                  <use x="168" y="36" xlink:href="#p" />
                  <use x="204" y="36" xlink:href="#p" />
                  <use x="216" y="36" xlink:href="#p" />
                  <use x="228" y="36" xlink:href="#p" />
                  <use x="252" y="36" xlink:href="#p" />
                  <use x="264" y="36" xlink:href="#p" />
                  <use x="276" y="36" xlink:href="#p" />
                  <use x="288" y="36" xlink:href="#p" />
                  <use x="300" y="36" xlink:href="#p" />
                  <use x="324" y="36" xlink:href="#p" />
                  <use x="348" y="36" xlink:href="#p" />
                  <use x="360" y="36" xlink:href="#p" />
                  <use x="372" y="36" xlink:href="#p" />
                  <use x="396" y="36" xlink:href="#p" />
                  <use x="12" y="48" xlink:href="#p" />
                  <use x="36" y="48" xlink:href="#p" />
                  <use x="48" y="48" xlink:href="#p" />
                  <use x="60" y="48" xlink:href="#p" />
                  <use x="84" y="48" xlink:href="#p" />
                  <use x="108" y="48" xlink:href="#p" />
                  <use x="120" y="48" xlink:href="#p" />
                  <use x="180" y="48" xlink:href="#p" />
                  <use x="204" y="48" xlink:href="#p" />
                  <use x="240" y="48" xlink:href="#p" />
                  <use x="276" y="48" xlink:href="#p" />
                  <use x="300" y="48" xlink:href="#p" />
                  <use x="324" y="48" xlink:href="#p" />
                  <use x="348" y="48" xlink:href="#p" />
                  <use x="360" y="48" xlink:href="#p" />
                  <use x="372" y="48" xlink:href="#p" />
                  <use x="396" y="48" xlink:href="#p" />
                  <use x="12" y="60" xlink:href="#p" />
                  <use x="36" y="60" xlink:href="#p" />
                  <use x="48" y="60" xlink:href="#p" />
                  <use x="60" y="60" xlink:href="#p" />
                  <use x="84" y="60" xlink:href="#p" />
                  <use x="144" y="60" xlink:href="#p" />
                  <use x="180" y="60" xlink:href="#p" />
                  <use x="204" y="60" xlink:href="#p" />
                  <use x="228" y="60" xlink:href="#p" />
                  <use x="276" y="60" xlink:href="#p" />
                  <use x="300" y="60" xlink:href="#p" />
                  <use x="324" y="60" xlink:href="#p" />
                  <use x="348" y="60" xlink:href="#p" />
                  <use x="360" y="60" xlink:href="#p" />
                  <use x="372" y="60" xlink:href="#p" />
                  <use x="396" y="60" xlink:href="#p" />
                  <use x="12" y="72" xlink:href="#p" />
                  <use x="84" y="72" xlink:href="#p" />
                  <use x="120" y="72" xlink:href="#p" />
                  <use x="144" y="72" xlink:href="#p" />
                  <use x="168" y="72" xlink:href="#p" />
                  <use x="180" y="72" xlink:href="#p" />
                  <use x="192" y="72" xlink:href="#p" />
                  <use x="228" y="72" xlink:href="#p" />
                  <use x="252" y="72" xlink:href="#p" />
                  <use x="264" y="72" xlink:href="#p" />
                  <use x="276" y="72" xlink:href="#p" />
                  <use x="288" y="72" xlink:href="#p" />
                  <use x="300" y="72" xlink:href="#p" />
                  <use x="324" y="72" xlink:href="#p" />
                  <use x="396" y="72" xlink:href="#p" />
                  <use x="12" y="84" xlink:href="#p" />
                  <use x="24" y="84" xlink:href="#p" />
                  <use x="36" y="84" xlink:href="#p" />
                  <use x="48" y="84" xlink:href="#p" />
                  <use x="60" y="84" xlink:href="#p" />
                  <use x="72" y="84" xlink:href="#p" />
                  <use x="84" y="84" xlink:href="#p" />
                  <use x="108" y="84" xlink:href="#p" />
                  <use x="132" y="84" xlink:href="#p" />
                  <use x="156" y="84" xlink:href="#p" />
                  <use x="180" y="84" xlink:href="#p" />
                  <use x="204" y="84" xlink:href="#p" />
                  <use x="228" y="84" xlink:href="#p" />
                  <use x="252" y="84" xlink:href="#p" />
                  <use x="276" y="84" xlink:href="#p" />
                  <use x="300" y="84" xlink:href="#p" />
                  <use x="324" y="84" xlink:href="#p" />
                  <use x="336" y="84" xlink:href="#p" />
                  <use x="348" y="84" xlink:href="#p" />
                  <use x="360" y="84" xlink:href="#p" />
                  <use x="372" y="84" xlink:href="#p" />
                  <use x="384" y="84" xlink:href="#p" />
                  <use x="396" y="84" xlink:href="#p" />
                  <use x="120" y="96" xlink:href="#p" />
                  <use x="144" y="96" xlink:href="#p" />
                  <use x="192" y="96" xlink:href="#p" />
                  <use x="204" y="96" xlink:href="#p" />
                  <use x="216" y="96" xlink:href="#p" />
                  <use x="240" y="96" xlink:href="#p" />
                  <use x="288" y="96" xlink:href="#p" />
                  <use x="36" y="108" xlink:href="#p" />
                  <use x="60" y="108" xlink:href="#p" />
                  <use x="72" y="108" xlink:href="#p" />
                  <use x="84" y="108" xlink:href="#p" />
                  <use x="108" y="108" xlink:href="#p" />
                  <use x="120" y="108" xlink:href="#p" />
                  <use x="132" y="108" xlink:href="#p" />
                  <use x="168" y="108" xlink:href="#p" />
                  <use x="180" y="108" xlink:href="#p" />
                  <use x="204" y="108" xlink:href="#p" />
                  <use x="240" y="108" xlink:href="#p" />
                  <use x="264" y="108" xlink:href="#p" />
                  <use x="276" y="108" xlink:href="#p" />
                  <use x="300" y="108" xlink:href="#p" />
                  <use x="312" y="108" xlink:href="#p" />
                  <use x="360" y="108" xlink:href="#p" />
                  <use x="396" y="108" xlink:href="#p" />
                  <use x="12" y="120" xlink:href="#p" />
                  <use x="48" y="120" xlink:href="#p" />
                  <use x="72" y="120" xlink:href="#p" />
                  <use x="108" y="120" xlink:href="#p" />
                  <use x="132" y="120" xlink:href="#p" />
                  <use x="144" y="120" xlink:href="#p" />
                  <use x="180" y="120" xlink:href="#p" />
                  <use x="192" y="120" xlink:href="#p" />
                  <use x="204" y="120" xlink:href="#p" />
                  <use x="216" y="120" xlink:href="#p" />
                  <use x="240" y="120" xlink:href="#p" />
                  <use x="252" y="120" xlink:href="#p" />
                  <use x="276" y="120" xlink:href="#p" />
                  <use x="300" y="120" xlink:href="#p" />
                  <use x="312" y="120" xlink:href="#p" />
                  <use x="324" y="120" xlink:href="#p" />
                  <use x="348" y="120" xlink:href="#p" />
                  <use x="384" y="120" xlink:href="#p" />
                  <use x="396" y="120" xlink:href="#p" />
                  <use x="36" y="132" xlink:href="#p" />
                  <use x="48" y="132" xlink:href="#p" />
                  <use x="72" y="132" xlink:href="#p" />
                  <use x="84" y="132" xlink:href="#p" />
                  <use x="96" y="132" xlink:href="#p" />
                  <use x="120" y="132" xlink:href="#p" />
                  <use x="144" y="132" xlink:href="#p" />
                  <use x="168" y="132" xlink:href="#p" />
                  <use x="180" y="132" xlink:href="#p" />
                  <use x="192" y="132" xlink:href="#p" />
                  <use x="240" y="132" xlink:href="#p" />
                  <use x="252" y="132" xlink:href="#p" />
                  <use x="264" y="132" xlink:href="#p" />
                  <use x="288" y="132" xlink:href="#p" />
                  <use x="300" y="132" xlink:href="#p" />
                  <use x="312" y="132" xlink:href="#p" />
                  <use x="336" y="132" xlink:href="#p" />
                  <use x="372" y="132" xlink:href="#p" />
                  <use x="384" y="132" xlink:href="#p" />
                  <use x="12" y="144" xlink:href="#p" />
                  <use x="24" y="144" xlink:href="#p" />
                  <use x="48" y="144" xlink:href="#p" />
                  <use x="60" y="144" xlink:href="#p" />
                  <use x="72" y="144" xlink:href="#p" />
                  <use x="96" y="144" xlink:href="#p" />
                  <use x="108" y="144" xlink:href="#p" />
                  <use x="120" y="144" xlink:href="#p" />
                  <use x="132" y="144" xlink:href="#p" />
                  <use x="156" y="144" xlink:href="#p" />
                  <use x="168" y="144" xlink:href="#p" />
                  <use x="180" y="144" xlink:href="#p" />
                  <use x="192" y="144" xlink:href="#p" />
                  <use x="204" y="144" xlink:href="#p" />
                  <use x="228" y="144" xlink:href="#p" />
                  <use x="252" y="144" xlink:href="#p" />
                  <use x="300" y="144" xlink:href="#p" />
                  <use x="324" y="144" xlink:href="#p" />
                  <use x="336" y="144" xlink:href="#p" />
                  <use x="348" y="144" xlink:href="#p" />
                  <use x="12" y="156" xlink:href="#p" />
                  <use x="60" y="156" xlink:href="#p" />
                  <use x="84" y="156" xlink:href="#p" />
                  <use x="96" y="156" xlink:href="#p" />
                  <use x="120" y="156" xlink:href="#p" />
                  <use x="132" y="156" xlink:href="#p" />
                  <use x="144" y="156" xlink:href="#p" />
                  <use x="156" y="156" xlink:href="#p" />
                  <use x="168" y="156" xlink:href="#p" />
                  <use x="192" y="156" xlink:href="#p" />
                  <use x="204" y="156" xlink:href="#p" />
                  <use x="240" y="156" xlink:href="#p" />
                  <use x="288" y="156" xlink:href="#p" />
                  <use x="300" y="156" xlink:href="#p" />
                  <use x="312" y="156" xlink:href="#p" />
                  <use x="336" y="156" xlink:href="#p" />
                  <use x="360" y="156" xlink:href="#p" />
                  <use x="372" y="156" xlink:href="#p" />
                  <use x="384" y="156" xlink:href="#p" />
                  <use x="396" y="156" xlink:href="#p" />
                  <use x="24" y="168" xlink:href="#p" />
                  <use x="72" y="168" xlink:href="#p" />
                  <use x="96" y="168" xlink:href="#p" />
                  <use x="108" y="168" xlink:href="#p" />
                  <use x="204" y="168" xlink:href="#p" />
                  <use x="312" y="168" xlink:href="#p" />
                  <use x="324" y="168" xlink:href="#p" />
                  <use x="384" y="168" xlink:href="#p" />
                  <use x="396" y="168" xlink:href="#p" />
                  <use x="24" y="180" xlink:href="#p" />
                  <use x="60" y="180" xlink:href="#p" />
                  <use x="84" y="180" xlink:href="#p" />
                  <use x="96" y="180" xlink:href="#p" />
                  <use x="108" y="180" xlink:href="#p" />
                  <use x="120" y="180" xlink:href="#p" />
                  <use x="132" y="180" xlink:href="#p" />
                  <use x="144" y="180" xlink:href="#p" />
                  <use x="156" y="180" xlink:href="#p" />
                  <use x="180" y="180" xlink:href="#p" />
                  <use x="216" y="180" xlink:href="#p" />
                  <use x="276" y="180" xlink:href="#p" />
                  <use x="288" y="180" xlink:href="#p" />
                  <use x="300" y="180" xlink:href="#p" />
                  <use x="336" y="180" xlink:href="#p" />
                  <use x="372" y="180" xlink:href="#p" />
                  <use x="384" y="180" xlink:href="#p" />
                  <use x="12" y="192" xlink:href="#p" />
                  <use x="24" y="192" xlink:href="#p" />
                  <use x="48" y="192" xlink:href="#p" />
                  <use x="60" y="192" xlink:href="#p" />
                  <use x="72" y="192" xlink:href="#p" />
                  <use x="108" y="192" xlink:href="#p" />
                  <use x="144" y="192" xlink:href="#p" />
                  <use x="156" y="192" xlink:href="#p" />
                  <use x="168" y="192" xlink:href="#p" />
                  <use x="192" y="192" xlink:href="#p" />
                  <use x="204" y="192" xlink:href="#p" />
                  <use x="216" y="192" xlink:href="#p" />
                  <use x="252" y="192" xlink:href="#p" />
                  <use x="288" y="192" xlink:href="#p" />
                  <use x="300" y="192" xlink:href="#p" />
                  <use x="324" y="192" xlink:href="#p" />
                  <use x="336" y="192" xlink:href="#p" />
                  <use x="384" y="192" xlink:href="#p" />
                  <use x="396" y="192" xlink:href="#p" />
                  <use x="24" y="204" xlink:href="#p" />
                  <use x="48" y="204" xlink:href="#p" />
                  <use x="84" y="204" xlink:href="#p" />
                  <use x="96" y="204" xlink:href="#p" />
                  <use x="108" y="204" xlink:href="#p" />
                  <use x="120" y="204" xlink:href="#p" />
                  <use x="144" y="204" xlink:href="#p" />
                  <use x="180" y="204" xlink:href="#p" />
                  <use x="192" y="204" xlink:href="#p" />
                  <use x="264" y="204" xlink:href="#p" />
                  <use x="276" y="204" xlink:href="#p" />
                  <use x="300" y="204" xlink:href="#p" />
                  <use x="312" y="204" xlink:href="#p" />
                  <use x="324" y="204" xlink:href="#p" />
                  <use x="384" y="204" xlink:href="#p" />
                  <use x="36" y="216" xlink:href="#p" />
                  <use x="48" y="216" xlink:href="#p" />
                  <use x="60" y="216" xlink:href="#p" />
                  <use x="96" y="216" xlink:href="#p" />
                  <use x="120" y="216" xlink:href="#p" />
                  <use x="156" y="216" xlink:href="#p" />
                  <use x="240" y="216" xlink:href="#p" />
                  <use x="252" y="216" xlink:href="#p" />
                  <use x="264" y="216" xlink:href="#p" />
                  <use x="288" y="216" xlink:href="#p" />
                  <use x="312" y="216" xlink:href="#p" />
                  <use x="324" y="216" xlink:href="#p" />
                  <use x="396" y="216" xlink:href="#p" />
                  <use x="36" y="228" xlink:href="#p" />
                  <use x="84" y="228" xlink:href="#p" />
                  <use x="108" y="228" xlink:href="#p" />
                  <use x="120" y="228" xlink:href="#p" />
                  <use x="132" y="228" xlink:href="#p" />
                  <use x="156" y="228" xlink:href="#p" />
                  <use x="180" y="228" xlink:href="#p" />
                  <use x="192" y="228" xlink:href="#p" />
                  <use x="204" y="228" xlink:href="#p" />
                  <use x="228" y="228" xlink:href="#p" />
                  <use x="264" y="228" xlink:href="#p" />
                  <use x="288" y="228" xlink:href="#p" />
                  <use x="312" y="228" xlink:href="#p" />
                  <use x="324" y="228" xlink:href="#p" />
                  <use x="336" y="228" xlink:href="#p" />
                  <use x="372" y="228" xlink:href="#p" />
                  <use x="384" y="228" xlink:href="#p" />
                  <use x="396" y="228" xlink:href="#p" />
                  <use x="24" y="240" xlink:href="#p" />
                  <use x="36" y="240" xlink:href="#p" />
                  <use x="48" y="240" xlink:href="#p" />
                  <use x="72" y="240" xlink:href="#p" />
                  <use x="108" y="240" xlink:href="#p" />
                  <use x="144" y="240" xlink:href="#p" />
                  <use x="156" y="240" xlink:href="#p" />
                  <use x="180" y="240" xlink:href="#p" />
                  <use x="216" y="240" xlink:href="#p" />
                  <use x="228" y="240" xlink:href="#p" />
                  <use x="252" y="240" xlink:href="#p" />
                  <use x="276" y="240" xlink:href="#p" />
                  <use x="288" y="240" xlink:href="#p" />
                  <use x="300" y="240" xlink:href="#p" />
                  <use x="312" y="240" xlink:href="#p" />
                  <use x="348" y="240" xlink:href="#p" />
                  <use x="360" y="240" xlink:href="#p" />
                  <use x="372" y="240" xlink:href="#p" />
                  <use x="384" y="240" xlink:href="#p" />
                  <use x="396" y="240" xlink:href="#p" />
                  <use x="12" y="252" xlink:href="#p" />
                  <use x="48" y="252" xlink:href="#p" />
                  <use x="60" y="252" xlink:href="#p" />
                  <use x="72" y="252" xlink:href="#p" />
                  <use x="84" y="252" xlink:href="#p" />
                  <use x="156" y="252" xlink:href="#p" />
                  <use x="168" y="252" xlink:href="#p" />
                  <use x="192" y="252" xlink:href="#p" />
                  <use x="252" y="252" xlink:href="#p" />
                  <use x="276" y="252" xlink:href="#p" />
                  <use x="300" y="252" xlink:href="#p" />
                  <use x="324" y="252" xlink:href="#p" />
                  <use x="336" y="252" xlink:href="#p" />
                  <use x="360" y="252" xlink:href="#p" />
                  <use x="48" y="264" xlink:href="#p" />
                  <use x="60" y="264" xlink:href="#p" />
                  <use x="144" y="264" xlink:href="#p" />
                  <use x="156" y="264" xlink:href="#p" />
                  <use x="168" y="264" xlink:href="#p" />
                  <use x="192" y="264" xlink:href="#p" />
                  <use x="228" y="264" xlink:href="#p" />
                  <use x="252" y="264" xlink:href="#p" />
                  <use x="276" y="264" xlink:href="#p" />
                  <use x="288" y="264" xlink:href="#p" />
                  <use x="300" y="264" xlink:href="#p" />
                  <use x="312" y="264" xlink:href="#p" />
                  <use x="336" y="264" xlink:href="#p" />
                  <use x="348" y="264" xlink:href="#p" />
                  <use x="384" y="264" xlink:href="#p" />
                  <use x="12" y="276" xlink:href="#p" />
                  <use x="48" y="276" xlink:href="#p" />
                  <use x="60" y="276" xlink:href="#p" />
                  <use x="72" y="276" xlink:href="#p" />
                  <use x="84" y="276" xlink:href="#p" />
                  <use x="96" y="276" xlink:href="#p" />
                  <use x="132" y="276" xlink:href="#p" />
                  <use x="156" y="276" xlink:href="#p" />
                  <use x="168" y="276" xlink:href="#p" />
                  <use x="228" y="276" xlink:href="#p" />
                  <use x="252" y="276" xlink:href="#p" />
                  <use x="276" y="276" xlink:href="#p" />
                  <use x="288" y="276" xlink:href="#p" />
                  <use x="300" y="276" xlink:href="#p" />
                  <use x="312" y="276" xlink:href="#p" />
                  <use x="324" y="276" xlink:href="#p" />
                  <use x="336" y="276" xlink:href="#p" />
                  <use x="348" y="276" xlink:href="#p" />
                  <use x="372" y="276" xlink:href="#p" />
                  <use x="24" y="288" xlink:href="#p" />
                  <use x="48" y="288" xlink:href="#p" />
                  <use x="108" y="288" xlink:href="#p" />
                  <use x="120" y="288" xlink:href="#p" />
                  <use x="132" y="288" xlink:href="#p" />
                  <use x="144" y="288" xlink:href="#p" />
                  <use x="156" y="288" xlink:href="#p" />
                  <use x="168" y="288" xlink:href="#p" />
                  <use x="180" y="288" xlink:href="#p" />
                  <use x="192" y="288" xlink:href="#p" />
                  <use x="204" y="288" xlink:href="#p" />
                  <use x="216" y="288" xlink:href="#p" />
                  <use x="228" y="288" xlink:href="#p" />
                  <use x="252" y="288" xlink:href="#p" />
                  <use x="300" y="288" xlink:href="#p" />
                  <use x="312" y="288" xlink:href="#p" />
                  <use x="324" y="288" xlink:href="#p" />
                  <use x="348" y="288" xlink:href="#p" />
                  <use x="360" y="288" xlink:href="#p" />
                  <use x="372" y="288" xlink:href="#p" />
                  <use x="384" y="288" xlink:href="#p" />
                  <use x="396" y="288" xlink:href="#p" />
                  <use x="12" y="300" xlink:href="#p" />
                  <use x="36" y="300" xlink:href="#p" />
                  <use x="60" y="300" xlink:href="#p" />
                  <use x="72" y="300" xlink:href="#p" />
                  <use x="84" y="300" xlink:href="#p" />
                  <use x="96" y="300" xlink:href="#p" />
                  <use x="108" y="300" xlink:href="#p" />
                  <use x="120" y="300" xlink:href="#p" />
                  <use x="132" y="300" xlink:href="#p" />
                  <use x="168" y="300" xlink:href="#p" />
                  <use x="192" y="300" xlink:href="#p" />
                  <use x="204" y="300" xlink:href="#p" />
                  <use x="216" y="300" xlink:href="#p" />
                  <use x="228" y="300" xlink:href="#p" />
                  <use x="264" y="300" xlink:href="#p" />
                  <use x="276" y="300" xlink:href="#p" />
                  <use x="288" y="300" xlink:href="#p" />
                  <use x="300" y="300" xlink:href="#p" />
                  <use x="312" y="300" xlink:href="#p" />
                  <use x="324" y="300" xlink:href="#p" />
                  <use x="336" y="300" xlink:href="#p" />
                  <use x="348" y="300" xlink:href="#p" />
                  <use x="360" y="300" xlink:href="#p" />
                  <use x="108" y="312" xlink:href="#p" />
                  <use x="120" y="312" xlink:href="#p" />
                  <use x="132" y="312" xlink:href="#p" />
                  <use x="144" y="312" xlink:href="#p" />
                  <use x="168" y="312" xlink:href="#p" />
                  <use x="180" y="312" xlink:href="#p" />
                  <use x="216" y="312" xlink:href="#p" />
                  <use x="240" y="312" xlink:href="#p" />
                  <use x="252" y="312" xlink:href="#p" />
                  <use x="264" y="312" xlink:href="#p" />
                  <use x="276" y="312" xlink:href="#p" />
                  <use x="288" y="312" xlink:href="#p" />
                  <use x="300" y="312" xlink:href="#p" />
                  <use x="348" y="312" xlink:href="#p" />
                  <use x="12" y="324" xlink:href="#p" />
                  <use x="24" y="324" xlink:href="#p" />
                  <use x="36" y="324" xlink:href="#p" />
                  <use x="48" y="324" xlink:href="#p" />
                  <use x="60" y="324" xlink:href="#p" />
                  <use x="72" y="324" xlink:href="#p" />
                  <use x="84" y="324" xlink:href="#p" />
                  <use x="120" y="324" xlink:href="#p" />
                  <use x="132" y="324" xlink:href="#p" />
                  <use x="156" y="324" xlink:href="#p" />
                  <use x="168" y="324" xlink:href="#p" />
                  <use x="180" y="324" xlink:href="#p" />
                  <use x="204" y="324" xlink:href="#p" />
                  <use x="228" y="324" xlink:href="#p" />
                  <use x="252" y="324" xlink:href="#p" />
                  <use x="276" y="324" xlink:href="#p" />
                  <use x="288" y="324" xlink:href="#p" />
                  <use x="300" y="324" xlink:href="#p" />
                  <use x="324" y="324" xlink:href="#p" />
                  <use x="348" y="324" xlink:href="#p" />
                  <use x="372" y="324" xlink:href="#p" />
                  <use x="12" y="336" xlink:href="#p" />
                  <use x="84" y="336" xlink:href="#p" />
                  <use x="108" y="336" xlink:href="#p" />
                  <use x="132" y="336" xlink:href="#p" />
                  <use x="144" y="336" xlink:href="#p" />
                  <use x="156" y="336" xlink:href="#p" />
                  <use x="168" y="336" xlink:href="#p" />
                  <use x="240" y="336" xlink:href="#p" />
                  <use x="252" y="336" xlink:href="#p" />
                  <use x="264" y="336" xlink:href="#p" />
                  <use x="276" y="336" xlink:href="#p" />
                  <use x="300" y="336" xlink:href="#p" />
                  <use x="348" y="336" xlink:href="#p" />
                  <use x="396" y="336" xlink:href="#p" />
                  <use x="12" y="348" xlink:href="#p" />
                  <use x="36" y="348" xlink:href="#p" />
                  <use x="48" y="348" xlink:href="#p" />
                  <use x="60" y="348" xlink:href="#p" />
                  <use x="84" y="348" xlink:href="#p" />
                  <use x="108" y="348" xlink:href="#p" />
                  <use x="132" y="348" xlink:href="#p" />
                  <use x="180" y="348" xlink:href="#p" />
                  <use x="240" y="348" xlink:href="#p" />
                  <use x="252" y="348" xlink:href="#p" />
                  <use x="276" y="348" xlink:href="#p" />
                  <use x="300" y="348" xlink:href="#p" />
                  <use x="312" y="348" xlink:href="#p" />
                  <use x="324" y="348" xlink:href="#p" />
                  <use x="336" y="348" xlink:href="#p" />
                  <use x="348" y="348" xlink:href="#p" />
                  <use x="384" y="348" xlink:href="#p" />
                  <use x="12" y="360" xlink:href="#p" />
                  <use x="36" y="360" xlink:href="#p" />
                  <use x="48" y="360" xlink:href="#p" />
                  <use x="60" y="360" xlink:href="#p" />
                  <use x="84" y="360" xlink:href="#p" />
                  <use x="144" y="360" xlink:href="#p" />
                  <use x="156" y="360" xlink:href="#p" />
                  <use x="168" y="360" xlink:href="#p" />
                  <use x="180" y="360" xlink:href="#p" />
                  <use x="192" y="360" xlink:href="#p" />
                  <use x="228" y="360" xlink:href="#p" />
                  <use x="252" y="360" xlink:href="#p" />
                  <use x="264" y="360" xlink:href="#p" />
                  <use x="276" y="360" xlink:href="#p" />
                  <use x="312" y="360" xlink:href="#p" />
                  <use x="324" y="360" xlink:href="#p" />
                  <use x="12" y="372" xlink:href="#p" />
                  <use x="36" y="372" xlink:href="#p" />
                  <use x="48" y="372" xlink:href="#p" />
                  <use x="60" y="372" xlink:href="#p" />
                  <use x="84" y="372" xlink:href="#p" />
                  <use x="108" y="372" xlink:href="#p" />
                  <use x="132" y="372" xlink:href="#p" />
                  <use x="144" y="372" xlink:href="#p" />
                  <use x="168" y="372" xlink:href="#p" />
                  <use x="180" y="372" xlink:href="#p" />
                  <use x="192" y="372" xlink:href="#p" />
                  <use x="216" y="372" xlink:href="#p" />
                  <use x="228" y="372" xlink:href="#p" />
                  <use x="264" y="372" xlink:href="#p" />
                  <use x="288" y="372" xlink:href="#p" />
                  <use x="300" y="372" xlink:href="#p" />
                  <use x="312" y="372" xlink:href="#p" />
                  <use x="360" y="372" xlink:href="#p" />
                  <use x="372" y="372" xlink:href="#p" />
                  <use x="396" y="372" xlink:href="#p" />
                  <use x="12" y="384" xlink:href="#p" />
                  <use x="84" y="384" xlink:href="#p" />
                  <use x="120" y="384" xlink:href="#p" />
                  <use x="132" y="384" xlink:href="#p" />
                  <use x="156" y="384" xlink:href="#p" />
                  <use x="168" y="384" xlink:href="#p" />
                  <use x="204" y="384" xlink:href="#p" />
                  <use x="228" y="384" xlink:href="#p" />
                  <use x="264" y="384" xlink:href="#p" />
                  <use x="276" y="384" xlink:href="#p" />
                  <use x="336" y="384" xlink:href="#p" />
                  <use x="348" y="384" xlink:href="#p" />
                  <use x="384" y="384" xlink:href="#p" />
                  <use x="12" y="396" xlink:href="#p" />
                  <use x="24" y="396" xlink:href="#p" />
                  <use x="36" y="396" xlink:href="#p" />
                  <use x="48" y="396" xlink:href="#p" />
                  <use x="60" y="396" xlink:href="#p" />
                  <use x="72" y="396" xlink:href="#p" />
                  <use x="84" y="396" xlink:href="#p" />
                  <use x="120" y="396" xlink:href="#p" />
                  <use x="156" y="396" xlink:href="#p" />
                  <use x="192" y="396" xlink:href="#p" />
                  <use x="312" y="396" xlink:href="#p" />
                  <use x="336" y="396" xlink:href="#p" />
                  <use x="360" y="396" xlink:href="#p" />
                  <use x="384" y="396" xlink:href="#p" />
                  <use x="396" y="396" xlink:href="#p" />
              </g>
              </svg>
            </div>
            <div>
              测试用Token: test
            </div>
            <a-form layout="horizontal" :form="form">
              <a-form-model-item label="token" :label-col="{span :4}" :wrapper-col="{span: 18}">
                <a-input v-decorator="['token', { rules: [{ required: true, message: '请输入付款得到的Token' }] },]"></a-input>
              </a-form-model-item>
            </a-form>
            <div class="button-block">
              <a-button block type="primary" @click="checkAndCommit"> 确认完成 <a-icon type="check" /> </a-button>
            </div>
          </div>
        </template>

        <template v-if="currentStep === 2">
          <div class="centered-block">
            <div class="loading-result" v-if="validating">
              <a-spin class="spinner">
                <a-icon slot="indicator" type="loading" style="font-size: 64px" spin />
              </a-spin>
              <h2>正在验证支付结果</h2>
            </div>
            <div class="succeeded-payment" v-if="!validating && succeeded">
              <a-result
                  status="success"
                  title="订单支付成功！"
                  :sub-title="'订单号: ' + payment_id"
              >
                <template #extra>
                  <a-button key="close" type="primary" @click="closeWindow">
                    关闭支付页面
                  </a-button>
                </template>
              </a-result>
            </div>

            <div class="faileded-payment" v-if="!validating && !succeeded">
              <a-result
                  status="error"
                  title="付款失败"
                  :sub-title="errorMessage"
              >
                <template #extra>
                  <a-button key="return" type="primary" @click="returnToPay">
                    返回付款页面
                  </a-button>
                  <a-button key="cancelPayment" @click="closeWindow">
                    放弃订单
                  </a-button>
                </template>
              </a-result>
            </div>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import api_service from "../../utils/apis";

export default {
  name: "NewPayment",
  props: ["payment_info"],
  data() {
    return {
      currentStep: 0,
      // payment_info: {
      //   amount: 98,
      //   content: "视频xxxxxxxxxx111111",
      //   payment_type: "video",
      //   video_id: 0,
      // },
      form: this.$form.createForm(this, { name: 'token' }),
      validating: true,
      succeeded: false,
      payment_id: null,
      errorMessage: "Error Happened!"
    }
  },
  methods: {
    gotoPay() {
      this.currentStep = 1;
    },
    returnToPay() {
      this.currentStep = 1;
      this.validating = true;
    },
    closeWindow() {
      this.$emit("close-window");
    },
    checkAndCommit() {
      let _this = this;
      this.form.validateFields(err => {
        if (!err) {
          // next step
          _this.currentStep = 2;
          // console.log(_this.payment_info.payment_type, _this.payment_info.video_id, _this.form.getFieldValue('token'))
          api_service.call_create_new_payment(_this.$store, _this.payment_info.payment_type,
              _this.payment_info.video_id, _this.form.getFieldValue('token'))
            .then(res => {
              _this.payment_id = res['payment_id'];
              _this.succeeded = true;
              _this.validating = false;
              _this.$emit("payment-successful");
            })
            .catch(err => {
              _this.errorMessage = err['status'];
              _this.succeeded = false;
              _this.validating = false;
            })
        }
      });
    },
  }
}
</script>

<style scoped>
.new-payment-root {
  width: 100%;
  margin: 0 auto;
}

.centered-block {
  width: 80%;
  margin: 16px auto;
}

.button-block {
  width: 60%;
  margin: 32px auto;
}

.info-item {
  margin: 16px 0px;
}

.qrcode {
  text-align: center;
  margin: 8px;
}

.codeimg {
  border: 1px dashed;
  padding: 4px;
  border-radius: 8px;
}

.instruction {
  font-size: 20px;
  text-align: center;
  margin: 8px;
}

.loading-result {
  text-align: center;
}

.spinner {
  margin: 16px auto 32px;
}
</style>