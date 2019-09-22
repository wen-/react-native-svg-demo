const host = {
  dev: 'https://wen-xiong.github.io/api/data', // 本地开发
  production: 'https://wen-xiong.github.io/api/data', // 生产环境
};

const userHost = host.dev;

export default {
  test: `${userHost}/test.json`
}