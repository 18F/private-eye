declare module '@18f/private-eye' {
  export interface PrivateEyeOptions {
    defaultMessage?: string;
    wrapper?: string;
    ignoreUrls: string[];
  }

  export default class PrivateEye {
    constructor(options: PrivateEyeOptions);

    checkLinks(): void;
  }
}
