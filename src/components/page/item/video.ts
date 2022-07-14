import { BaseComponent } from './../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player"><iframe class="video__iframe"></iframe></div>
            <h2 class="video__title"></h2>
          </section>`);

    const videoElement = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    videoElement.src = this.convertToEmbeddedURL(url);

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu.be|youtube.com)\/(?:embed\/)?(?:watch\?v\=)?([a-zA-Z0-9-]{11})/;
    const match = url.match(regExp);
    const videoId = match ? match[1] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
