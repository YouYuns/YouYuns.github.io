declare module 'react-image-gallery' {
  import { Component } from 'react';

  export interface ReactImageGalleryItem {
    original: string;
    thumbnail?: string;
    description?: string;
    originalClass?: string;
    thumbnailClass?: string;
    originalAlt?: string;
    thumbnailAlt?: string;
  }

  export default class ImageGallery extends Component<{ items: ReactImageGalleryItem[] }> {}
}
