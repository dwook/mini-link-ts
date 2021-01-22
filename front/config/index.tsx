export const backURL = process.env.NODE_ENV === 'production'
  ? 'https://api.mini-link.site'
  : 'http://localhost:5000';

export const CASELIST = [
  {
    id: 'vivastudio',
    category: 'fashion',
    name: '비바스튜디오',
    img:
        'https://mini-link.s3.ap-northeast-2.amazonaws.com/original/1610891465951_vivastudio_cover.jpg',
    mockup:
        'https://mini-link.s3.ap-northeast-2.amazonaws.com/mockups_vivastudio.png',
  },
  {
    id: 'alicefunk',
    category: 'influencer',
    name: '앨리스펑크',
    img:
        'https://mini-link.s3.ap-northeast-2.amazonaws.com/original/1610891792221_alicefunk_cover.jpg',
    mockup:
        'https://mini-link.s3.ap-northeast-2.amazonaws.com/mockups_alicefunk.png',
  },
  {
    id: 'hellonature',
    category: 'food',
    name: '헬로네이처',
    img:
        'https://mini-link.s3.ap-northeast-2.amazonaws.com/original/1610894213199_hellonature_cover.jpg',
    mockup:
        'https://mini-link.s3.ap-northeast-2.amazonaws.com/mockups_hellonature.png',
  },
];
