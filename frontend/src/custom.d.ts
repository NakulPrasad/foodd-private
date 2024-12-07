/**
 * @description This file stores the custom import types that TS compiler demands.
 * 
 */

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const value: string;
  export default value;
}

// declare module "*.css" {
//   const content: Record<string, string>;
//   export default content;
// }
