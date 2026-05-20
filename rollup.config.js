import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';  // Import the correct PostCSS plugin
import obfuscator from 'rollup-plugin-obfuscator';


export default(commandLineArgs)=>{
  
  const isProduction = commandLineArgs.environment === 'NODE_ENV:production' || false;

  // You might also check for the built-in --watch flag
  const isWatch = commandLineArgs.watch;

  // Decide whether to apply terser
  const shouldApplyTerser = isProduction && !isWatch;
  let output_umd_min = {
            file: 'dist/thinkproc.umd.min.js',
            format: 'umd',
            name: 'ThinkProctor', 
            sourcemap: true,
            plugins: [], 
          };
  let output_umd = {
            file: 'dist/thinkproc.umd.js',
            format: 'umd',
            name: 'ThinkProctor', 
            sourcemap: true,
            plugins: [], 
          };        
  

  let output_esm_min = {
        file: 'dist/thinkproc.min.esm.js',
        format: 'esm',
        plugins: [],
        sourcemap: false
      };

   let output_esm = {
      file: 'dist/thinkproc.esm.js',
      format: 'esm',
      sourcemap: true
    };
  if(shouldApplyTerser){
    output_umd_min.plugins = [terser()];
    output_esm_min.plugins = [terser()];
  }      

 return [
  {
  input: 'src/index.ts',
  output: [
    output_umd_min,
    // output_umd,
    output_esm_min,
    // output_esm
  ],
  plugins: [
    nodeResolve({
      browser: true, // Crucial for resolving browser-specific versions if available
      preferBuiltins: false, // Ensure that polyfills are preferred over Node.js built-ins
    }), 
    commonjs({
      ignoreGlobal: false, // <-- allow `this` usage at top level
      include: /node_modules/,
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    // obfuscator({
    //   compact: true,
    //   controlFlowFlattening: true,
    // }),
    postcss()  // Add the PostCSS plugin here
  ],
},
{
  // --- Web Worker Bundle (worker.js) ---
  input: 'src/core/SocketWorker.ts',
  output: {
    dir: 'dist',
    format: 'iife', // Workers should generally use 'iife' or 'esm'
    name: 'SocketWorker',
    entryFileNames: 'socketWorker.js', // Output the worker to a predictable name
  },
  plugins: [
    nodeResolve({ 
      browser: true, 
      preferBuiltins: false 
    }),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      // The worker doesn't need to generate declarations (*.d.ts)
      declaration: false,
      declarationDir: undefined,
    }),
  ],
},
{
  // --- Transcript Worker Bundle (worker.js) ---
  input: 'src/core/TranscriptWorker.ts',
  output: {
    dir: 'dist',
    format: 'esm', // Workers should generally use 'iife' or 'esm' 
    entryFileNames: 'pcm-processor.js', // Output the worker to a predictable name
  },
  plugins: [
    nodeResolve({ 
      browser: true, 
      preferBuiltins: false 
    }),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      // The worker doesn't need to generate declarations (*.d.ts)
      declaration: false, 
    }),
  ],
},
{
  // --- Transcript Worker Bundle (worker.js) ---
  input: 'src/core/RecordingWorker.ts',
  output: {
    dir: 'dist',
    format: 'esm', // Workers should generally use 'iife' or 'esm' 
    entryFileNames: 'recordingWorker.js', // Output the worker to a predictable name
  },
  plugins: [
    nodeResolve({ 
      browser: true, 
      preferBuiltins: false 
    }),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      // The worker doesn't need to generate declarations (*.d.ts)
      declaration: false, 
    }),
  ],
}

];
};
