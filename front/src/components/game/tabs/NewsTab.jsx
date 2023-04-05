import React from 'react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import imgPath from '../assets/news.png';
import { stockNews } from '../../../store/gamedata/GameData.selector';
import { selectedIdx } from '../../../store/buysellmodal/BuySell.selector';

export default function NewsTab() {
  const news = useSelector(stockNews);
  const newsData = { news: Object.assign({}, ...news) };
  const idx = useSelector(selectedIdx);
  const keys = Object.keys(newsData.news);
  const thisNews = newsData.news[keys[idx]];
  const { title } = thisNews;
  const content = thisNews.summary;

  return (
    <TabContanier>
      <ImageBox>
        <img className="w-[100%]" src={imgPath} alt="" />
      </ImageBox>

      {thisNews.isExist ? (
        <ContentSection>
          <ContentTitle>{title.replace(/\[|\]|'/g, '')}</ContentTitle>
          <ContentBox>{content.replace(/['\[\]]/g, '')}</ContentBox>
        </ContentSection>
      ) : (
        <ContentSection>
          <ContentTitle> 해당 날짜의 뉴스가 없습니다. </ContentTitle>
        </ContentSection>
      )}
    </TabContanier>
  );
}

const TabContanier = styled.div`
  ${tw`flex relative max-h-[80%] h-[80%]`}
`;

const ImageBox = styled.div`
  ${tw`w-[20%] flex flex-col justify-center items-center my-auto`}
`;

const HelpText = styled.div`
  word-wrap: break-word;
  word-break: keep-all;
  ${tw`text-center w-[100%] text-xs opacity-50`};
`;

const ContentSection = styled.div`
  ${tw`flex flex-col ml-8 w-[80%] text-left h-[100%]`}
`;

const ContentTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  ${tw`text-2xl font-bold mb-4 mx-auto`}
`;

const ContentBox = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  ${tw``}
`;
