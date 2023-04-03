import React from 'react';
import tw, { styled } from 'twin.macro';
import { useSelector } from 'react-redux';
import imgPath from '../Items/news.png';
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
  const Url = thisNews.articleUrl;

  return (
    <TabContanier>
      {thisNews.isExist ? (
        <ImageBox>
          <a href={Url} target="_blank" rel="noopener noreferrer">
            <img className="w-[90%]" src={imgPath} alt="" />
          </a>
          <HelpText>이미지 클릭시 원문으로 이동</HelpText>
        </ImageBox>
      ) : (
        <ImageBox>
          <img className="w-[90%]" src={imgPath} alt="" />
          <HelpText>해당 날짜의 뉴스가 없습니다</HelpText>
        </ImageBox>
      )}

      {/*  */}
      {thisNews.isExist ? (
        <ContentSection>
          <ContentTitle>{title.replace(/\[|\]|'/g, '')}</ContentTitle>
          <ContentBox>{content.replace(/['\[\]]/g, '')}</ContentBox>
        </ContentSection>
      ) : null}
    </TabContanier>
  );
}

const TabContanier = styled.div`
  ${tw`flex relative max-h-[80%]`}
`;

const ImageBox = styled.div`
  ${tw`w-[20%] flex flex-col justify-center items-center`}
`;

const HelpText = styled.div`
  word-wrap: break-word;
  word-break: keep-all;
  ${tw`text-center w-[100%] text-xs opacity-50`};
`;

const ContentSection = styled.div`
  ${tw`flex flex-col ml-8 w-[80%] text-left`}
`;

const ContentTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  ${tw`text-2xl font-bold mb-4`}
`;

const ContentBox = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  ${tw``}
`;
