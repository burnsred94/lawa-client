interface IConfig {
    assetsBase: string
  }
  
  export class AssetService {
    protected config: IConfig
  
    constructor(config: IConfig) {
      this.config = config
    }
  
    public permalink(path: string, entity = 'asset') {
      switch (entity) {
      case 'asset':
      default:
        return this.config.assetsBase + path
      }
    }
  }
  