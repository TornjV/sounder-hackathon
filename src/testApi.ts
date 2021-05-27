import RSSParser from 'rss-parser';
import axios from 'axios';
import produce from 'immer';

import { render, getRenderInfo, RenderRequest, RenderInfoResponse } from './veedApi/render';

const VEED_KEY = process.env['VEED_KEY'];

const rss_parser = new RSSParser();

const getURL = (url: string) => {
  const url_object = new URL(url);

  return `${url_object.origin}${url_object.pathname}`;
};

const get_vtt = async (episode: any) => {
  const { data } = await axios.get(`https://svc.sounder.fm/api/public/v1/episodes/${episode.enclosure.url.split('--')[1]}/transcriptions/active`);

  const { data: transcription } = await axios.get(data.data.path);

  const result = transcription.results.items.filter((item: any) => +item.end_time < 15.0);

  return result;
};

async function start() {
  if (!VEED_KEY) {
    throw new Error('VEED_KEY environment variable not set, please set it to your veed key');
  }

  let feed = await rss_parser.parseURL('https://feeds.sounder.fm/287/rss.xml');

  const episode = feed.items[0];

  const transcription = await get_vtt(episode);

  // const subtitle_items = transcription.map((item: any) => ({
  //   from: +item.start_time,
  //   to: +item.end_time,
  //   value: item.alternatives[0].content
  // }));

  const subtitle_items = transcription.reduce(
    produce((acc: any, item: any, i: any) => {
      const global = Math.floor(i / 3);
      const local = i % 3;

      acc[global] = {
        from: local === 0 ? +item.start_time : acc[global].from,
        to: +item.end_time,
        value: `${local === 0 ? '' : acc[global].value}${local === 0 ? '' : ' '}${item.alternatives[0].content}`
      };
    }),
    []
  );

  const portraitRenderRequest: RenderRequest = {
    params: {
      dimensions: {
        width: 1080,
        height: 1920
      },
      duration: 15.0,
      background_color: '#05147d'
    },
    elements: [
      {
        type: 'audio',
        params: {
          source: {
            url: getURL(episode.enclosure.url)
          },
          subtitles: {
            items: subtitle_items,
            position: {
              origin: 'center center',
              x: 540,
              y: 1550
            },
            style: {
              size: 60,
              wrap_width: 666,
              color: '#ffffff',
              secondary_color: '#192033',
              font: 'Courier',
              display: 'line_block_hard'
            }
          }
        }
      },
      {
        type: 'image',
        params: {
          source: {
            url: 'https://sounder.fm/images/hero-s.png'
          },
          position: {
            origin: 'top right',
            x: 1080,
            y: 0
          },
          dimensions: {
            width: 1000,
            height: 1440
          }
        }
      },
      {
        type: 'image',
        params: {
          source: {
            url: getURL(feed.image.url)
          },
          dimensions: {
            width: 666,
            height: 666
          },
          position: {
            x: 540,
            y: 950,
            origin: 'center center'
          }
        }
      },
      {
        type: 'image',
        params: {
          source: {
            url: 'https://i.imgur.com/Jkxw94u.png'
          },
          position: {
            x: 873,
            y: 1300,
            origin: 'top right'
          }
        }
      },
      {
        type: 'text',
        params: {
          value: feed.title,
          position: {
            x: 'center',
            y: 200,
            origin: 'top center'
          },
          dimensions: {
            width: 666,
            height: 300
          },
          style: {
            color: 'white',
            size: 100,
            font: 'Times',
            weight: 'bold'
          }
        }
      },
      {
        type: 'progress_bar',
        params: {
          dimensions: {
            height: 100,
            width: 1080
          },
          style: {
            color: '#ffffff',
            secondary_color: '#ffffff00'
          }
        }
      },
      {
        type: 'audio_wave',
        params: {
          dimensions: {
            width: 1080,
            height: 500
          },
          position: {
            origin: 'center center',
            x: 540,
            y: 1920
          }
        }
      }
    ]
  };

  const squareRenderRequest: RenderRequest = {
    params: {
      dimensions: {
        width: 1080,
        height: 1080
      },
      duration: 15.0,
      background_color: '#05147d'
    },
    elements: [
      {
        type: 'image',
        params: {
          source: {
            url: 'https://sounder.fm/images/hero-s.png'
          },
          position: {
            origin: 'top right',
            x: 1080,
            y: 0
          },
          dimensions: {
            width: 1000,
            height: 1440
          }
        }
      },
      {
        type: 'image',
        params: {
          source: {
            url: getURL(feed.image.url)
          },
          dimensions: {
            width: 500,
            height: 500
          },
          position: {
            x: 540,
            y: 125,
            origin: 'top center'
          }
        }
      },
      {
        type: 'image',
        params: {
          source: {
            url: 'https://i.imgur.com/Jkxw94u.png'
          },
          position: {
            x: 790,
            y: 630,
            origin: 'top right'
          }
        }
      },
      {
        type: 'text',
        params: {
          value: feed.title,
          position: {
            x: 290,
            y: 630,
            origin: 'top left'
          },
          dimensions: {
            width: 666,
            height: 300
          },
          style: {
            color: 'white',
            size: 32,
            font: 'Times',
            weight: 'bold',
            wrap: 'nowrap'
          }
        }
      },
      {
        type: 'progress_bar',
        params: {
          dimensions: {
            height: 75,
            width: 1080
          },
          style: {
            color: '#ffffff',
            secondary_color: '#ffffff00'
          }
        }
      },
      {
        type: 'audio_wave',
        params: {
          dimensions: {
            width: 1080,
            height: 300
          },
          position: {
            origin: 'center center',
            x: 540,
            y: 1080
          }
        }
      },
      {
        type: 'audio',
        params: {
          source: {
            url: getURL(episode.enclosure.url)
          },
          subtitles: {
            items: subtitle_items,
            position: {
              origin: 'center center',
              x: 540,
              y: 850
            },
            style: {
              size: 60,
              wrap_width: 666,
              color: '#ffffff',
              secondary_color: '#192033',
              font: 'Courier',
              display: 'line_block_hard'
            }
          }
        }
      }
    ]
  };

  const result = await render(VEED_KEY, portraitRenderRequest);
  const renderId = result.id;

  let renderInProgress = true;

  let renderInfo: RenderInfoResponse = null;

  while (renderInProgress) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    renderInfo = await getRenderInfo(VEED_KEY, renderId);
    renderInProgress = !renderInfo?.latest_event?.payload?.progress || renderInfo.latest_event.payload.progress !== 100;
    console.log(renderInfo);
  }
  if (renderInfo?.latest_event?.type === 'RENDER/SUCCESS') {
    return renderInfo.latest_event.payload.url;
  } else {
    console.error(`Process failed! Error: ${renderInfo?.latest_event?.payload?.message}`);
  }
}

start().catch((e) => console.error(e));
