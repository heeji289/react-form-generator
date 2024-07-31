import { Form } from '../form.type';

// 폼 데이터 (서버에서 받아온 것으로 가정)
export const formData: Form = {
  id: 'form1',
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
    {
      id: 'section2',
      title: '섹션2',
      questions: [
        {
          id: 'question4',
          type: 'textarea',
          title: '자기소개 입력란',
          required: false,
        },
      ],
    },
  ],
};
