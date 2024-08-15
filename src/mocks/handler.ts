import { http, HttpResponse } from 'msw';
import { Survey } from '../app/survey/types/survey';

const data: Survey = {
  id: 'survey1',
  title: '제목 없는 설문지',
  sections: [
    {
      id: 'section1',
      title: '섹션1',
      questions: [
        {
          id: 'question1',
          type: 'text',
          title: '성함을 입력해주세요.',
          required: true,
        },
        {
          id: 'question2',
          type: 'radio',
          title: '성별',
          options: ['남자', '여자', '기타'],
          required: true,
        },
        {
          id: 'question3',
          type: 'checkbox',
          title: '좋아하는 색상을 선택해주세요.',
          options: ['빨간색', '주황', '노랑'],
          required: true,
        },
      ],
    },
  ],
};

const data2: Survey = {
  id: 'survey2',
  title: '제목 있는 설문지',
  sections: [
    {
      id: 'section1',
      title: '섹션1',
      questions: [
        {
          id: 'question1',
          type: 'text',
          title: '성함을 입력해주세요.',
          required: true,
        },
        {
          id: 'question2',
          type: 'radio',
          title: '성별',
          options: ['남자', '여자', '기타'],
          required: true,
        },
        {
          id: 'question3',
          type: 'checkbox',
          title: '좋아하는 색상을 선택해주세요.',
          options: ['빨간색', '주황', '노랑'],
          required: true,
        },
      ],
    },
  ],
};

export const handlers = [
  http.get('/surveys', () => {
    return HttpResponse.json([data, data2]);
  }),

  http.get('/surveys/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === 'survey1') {
      return HttpResponse.json(data);
    }
    if (id === 'survey2') {
      return HttpResponse.json(data2);
    }
    return res(ctx.status(404));
  }),
];
