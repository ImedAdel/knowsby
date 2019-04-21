import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import tw from "tailwind.macro"

import siteConfig from "../../content/siteConfig/siteConfig"

const StyledWrapper = styled.div`
  ${tw`mb-16 pl-8 w-2/5`};
`
const StyledHeading = styled.h2`
  ${tw`text-3xl mb-4`};
`
const StyledTitle = styled.h3`
  ${tw`text-base  font-normal font-body leading-tight truncate max-w-xs w-auto mb-2`};
`
const StyledLink = styled(Link)`
  ${tw`no-underline text-grey-darker hover:text-grey-darkest hover:underline`};
`

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
                featured
              }
            }
          }
        }
      }
    `}
    render={data => (
      <StyledWrapper>
        <StyledHeading>{siteConfig.pageLabels.featured}</StyledHeading>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          if (node.frontmatter.featured) {
            return (
              <StyledTitle key={node.fields.slug}>
                <StyledLink to={node.fields.slug}>
                  <span role="img" aria-label="Memo">
                    📝
                  </span>{" "}
                  {title}
                </StyledLink>
              </StyledTitle>
            )
          } else {
            return null
          }
        })}
      </StyledWrapper>
    )}
  />
)
