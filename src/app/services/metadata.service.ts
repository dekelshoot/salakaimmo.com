import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
// import {HOST_URL} from './tokens/host-url';
import { Router } from '@angular/router';

export interface PageMetadata {
  title: string;
  // image will be added later
  description: string;
  author: string;
  keywords: string[];
  type: string;
  image: string;
}



@Injectable()
export class MetadataService {
  defaultMetadata: PageMetadata = {
    title: 'Salaka immobilier',
    description: 'Trouvez des Maison, appartements, Terrain, Boutiques,Studios, magasins et entrepots à louer ou à vendre  au Cameroun – salakaimmo.com.',
    author: 'Dekel Shoot',
    keywords: ['Appartement à louer', ' Maison à vendre', ' Maison à louer', 'Villa à louer', 'Duplex à louer ', 'Terrain à vendre', 'Boutique à louer', 'Fond de commerce', 'Studio à louer', 'Chambre à louer', 'Appartement meublé', 'Studio meublé', 'Chambre meublé'],
    type: 'website',
    image: '../../assets/logo.jpeg'
  }
  constructor(private metaTagService: Meta,
    private titleService: Title,
  ) { }

  public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const pageMetadata: PageMetadata = { ...this.defaultMetadata, ...metadata };
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);

    this.metaTagService.updateTag({ name: 'description', content: this.defaultMetadata.description });
    this.metaTagService.updateTag({ name: 'image', content: this.defaultMetadata.image })
    this.metaTagService.updateTag({ property: "og:image", itemprop: "image", content: this.defaultMetadata.image })
    // this.metaTagService.addTags([
    //  ...metatags,
    // //  { property: 'og:url', content: `${this.hostUrl}${this.router.url}`},
    //  { name: 'robots', content: index ? 'index, follow' : 'noindex' },
    //  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //  { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    // ]);

    this.titleService.setTitle(pageMetadata.title);
    console.log(this.metaTagService.getTags('name=description'));
  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },

      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },

      { name: 'author', content: metadata.author },
      { property: 'og:author', content: metadata.author },

      { name: "image", content: metadata.image },
      { property: "og:image", itemprop: "image", content: metadata.image },

      { name: 'keywords', content: metadata.keywords.join(', ') },

      { property: 'og:type', content: metadata.type },
    ];
  }
}
