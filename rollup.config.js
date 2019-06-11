import uglify from "rollup-plugin-uglify-es";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";

const config = {
    input: "src/index.js",
    external: ["react"],
    output: {
        format: "umd",
        name: "sdk",
        globals: {
            react: "React"
        }
    },
    plugins: [
        postcss({
            plugins: [require("postcss-inline-svg")],
            extensions: [ ".css" ]
        }),
        babel({
            exclude: "node_modules/**"
        }),
        uglify()
    ]
};

export default config;