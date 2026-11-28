---
title: 白标授权或买断交付什么
sidebar_label: 交付内容
description: 了解 Video Controls Plus 团队通过浏览器扩展白标授权交付什么，以及源代码买断会移交什么。
last_update:
  date: 2026-11-27
---

白标授权让你获得以自己品牌运营、由我们持续更新的扩展与网站。买断则让你取得源代码。

## 白标授权包含什么

- **以你的名称发布的扩展。**弹出面板、网页浮动控件和“设置”均使用你的名称、标志与颜色，面向 Chrome、Firefox 和 Edge 构建。
- **你的商店页面。**我们会在你自己的 Chrome 应用商店、Firefox 附加组件和 Microsoft Edge 扩展商店开发者账户下发布扩展。账户及商店收取的费用由你承担。
- **位于你域名上的配套网站。**网站提供扩展连接所需的账户页面，由我们部署和托管。
- **Video Controls Plus 当前拥有的控制：**0.1x 至 16x 速度、A-B 循环、最高 400% 的音量增强、滤镜、截图、带时间戳的笔记、可修改的键盘快捷键，以及 YouTube、Netflix 和 LinkedIn 专属工具。
- **自购买日起 6 个月更新。**详见[更新与续订](./updates.md)。
- **授权密钥和部署提供的授权文件，**任何人都可以[验证](./verify.md)。

授权不包含源代码，也不是独家授权：在有人买断前，我们可以向其他企业授权同一产品。

## Video Controls Plus 当前构建包含什么

这些是授权版本为你运行的部分，也是买断时会移交的部分。它们属于此产品的具体组成，方便你评估。

| 部分 | 当前内容 |
|---|---|
| 扩展 | 一个基于 WXT、React 和 TypeScript 的代码库：Chrome 与 Edge 使用 Manifest V3，Firefox 使用 Manifest V2。没有远程代码，所有库都包含在扩展包内，符合 Chrome 应用商店的要求。 |
| 网站专属工具 | 3 份功能注册表：62 项 YouTube 附加功能、52 项 Netflix 附加功能（其中 50 项有开关，安装时全部关闭）及 48 项 LinkedIn 工具。每条注册表记录驱动“设置”中的开关、浮动控件标签页和右键菜单。 |
| 登录 | 扩展不保存密码。用户在配套网站用 Google 登录，再用两处屏幕显示的短代码连接扩展。Chrome、Edge 和 Firefox 使用相同流程。 |
| 配套网站 | 基于 Vite 和 React 构建，包括扩展连接的账户页面、笔记、书签、稍后观看、计划和开发者页面。 |
| 后端 | 使用行级安全策略的 Postgres 数据库、由 Drizzle 编写的架构，以及处理 AI 运行、文件上传、邮件、付款、API、助手（MCP）地址和 Webhook 的服务器函数。 |

Android 应用不属于浏览器扩展平台组。

## 源代码买断包含什么

- **构建扩展所需的所有代码仓库：**扩展本身、配套网站和两者共用的后端，以及设置说明。
- **自购买日起 6 个月更新，**以代码形式交付；之后如有需要，可续订。
- **停止销售。**我们会停止出售 Video Controls Plus 的授权和买断。此前购买授权的企业仍保留各自条款。

买断后，你可以自行运营。托管、商店账户和你选择的付费服务由你承担费用。

买断还包含版税：你需按 Video Controls Plus 产生的总收入支付 7%，不计入你收取的销售税或增值税。只要产品有收入，就需每季度提交收入报表并付款；之后再次转售，义务仍然存在。[授权条款](https://vcpeai.aoneahsan.com/white-label/license-terms)也写明了这一点。

完整条款见[授权条款](https://vcpeai.aoneahsan.com/white-label/license-terms)及[服务条款](https://vcpeai.aoneahsan.com/terms#policy-section-14)第 14 节。
