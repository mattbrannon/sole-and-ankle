/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const formattedPrice =
    salePrice > 0 ? formatPrice(salePrice) : null;

  const FancyLabel =
    variant === 'on-sale'
      ? SaleLabel
      : variant === 'new-release'
      ? NewLabel
      : Label;

  const FancyText =
    FancyLabel === SaleLabel
      ? 'Sale'
      : FancyLabel === NewLabel
      ? 'Just Released'
      : null;

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <FancyLabel>{FancyText}</FancyLabel>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{formattedPrice}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Label = styled.div`
  position: absolute;
  padding: 8px;

  border-radius: 2px;
  top: 12px;
  right: -4px;

  font-family: Raleway;
  font-size: ${14 / 18}rem;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

const SaleLabel = styled(Label)`
  background: #c5295d;
  color: white;
`;

const NewLabel = styled(Label)`
  background: #6868d9;
  color: white;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

// This feels a little weird but it works
const priceStyle = (p) => {
  return p.variant === 'on-sale'
    ? {
        color: COLORS.gray[700],
        textDecoration: 'line-through',
      }
    : null;
};

const Price = styled.span`
  ${priceStyle}
`;

const Strikethrough = styled(Price)`
  text-decoration: line-through;
  color: ${COLORS.gray[700]};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  margin-right: auto;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
