import { ConfigEnv, loadEnv, UserConfig } from "vite";
import { resolve } from "path";
import { VITE_DROP_CONSOLE, VITE_BASE_PATH } from "./config/constant";
import { themeVariables } from "./config/theme";
import { createVitePlugins } from "./config/plugins";
import proxy from "./config/proxy";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build";
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const { VITE_PORT, VITE_HTTP_API } = env;

  return {
    root: root,
    publicDir: "public",
    plugins: createVitePlugins(mode, isBuild),
    base: VITE_BASE_PATH,
    css: {
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        hashPrefix: "prefix",
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    },
    resolve: {
      alias: {
        "@": `${resolve(__dirname, "src")}`,
        config: `${resolve(__dirname, "config")}`,
      },
      // 解析package.json中的字段
      mainFields: ["module", "jsnext:main", "jsnext"],
      // 导入时想要省略的扩展名列表
      extensions: [".less", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss"],
    },
    json: {
      // 是否支持从 .json 文件中进行按名导入
      namedExports: true,
      // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好， 尤其是当 JSON 文件较大的时候。开启此项，则会禁用按名导入
      stringify: false,
    },
    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    clearScreen: false,
    // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
    logLevel: "info",
    server: {
      open: true,
      host: "0.0.0.0",
      port: parseInt(VITE_PORT),
      proxy: proxy(VITE_HTTP_API),
    },
    build: {
      target: "modules",
      outDir: "build",
      assetsDir: "assets",
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      sourcemap: true,
      minify: "terser",
      chunkSizeWarningLimit: 500,
      emptyOutDir: true,
      manifest: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "antd-mobile": ["antd-mobile"],
          },
        },
      },
      // 传递给 Terser 的更多 minify 选项。
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
    },
    // 全局变量替换 Record<string, string>
    define: {
      _GLOBAL_VARS_: JSON.stringify({
        ...env,
        MODE: mode,
        BUILD_TIME: new Date().toLocaleString(),
      }),
    },
  };
};
