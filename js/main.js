/* 厦门觉钧文化传播有限公司 · 官网交互脚本 */

// 移动端导航开合
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
})();

// 滚动揭示动画
(function () {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));
})();

// 页脚年份
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// 商务合作表单 → 组装 mailto（静态站无后端，提交唤起邮件客户端）
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const company = form.company.value.trim();
    const email = form.email.value.trim();
    const interest = form.interest.value;
    const message = form.message.value.trim();

    const subject = encodeURIComponent('【觉钧商务合作】' + (name || '意向客户'));
    const body = encodeURIComponent(
      '姓名：' + name + '\n' +
      '公司：' + company + '\n' +
      '邮箱：' + email + '\n' +
      '合作意向：' + interest + '\n' +
      '留言：\n' + message + '\n\n' +
      '（本邮件由官网演示表单生成）'
    );
    // 邮箱为占位，请替换为公司真实商务邮箱
    window.location.href = 'mailto:bd@juejun.com?subject=' + subject + '&body=' + body;
  });
})();
