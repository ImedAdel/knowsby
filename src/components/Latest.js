import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { rhythm } from "../utils/typography"
import _ from "lodash"
import styled from "styled-components"
import tw from "tailwind.macro"

const LatestArticles = styled.div`
  ${tw`mb-16 pl-8 w-2/5`};
`
const LatestArticles__Heading = styled.h2`
  ${tw`text-3xl mb-4`};
`
const LatestArticles__Link = styled(Link)`
  ${tw`no-underline text-grey-darker hover:text-grey-darkest hover:underline`};
`
const LatestArticles__Title = styled.h3`
  ${tw`text-base  font-normal font-body leading-tight truncate max-w-xs w-auto mb-2`};
`

// const LatestWrapper = styled.div`
//   max-width: ${rhythm(32/3)};
// `

const Latest = ({ data }) => (
  <LatestArticles>
    <LatestArticles__Heading>✨ Latest</LatestArticles__Heading>
    {data.allMarkdownRemark.edges.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <LatestArticles__Title key={node.fields.slug}>
          <LatestArticles__Link to={node.fields.slug}>
            📝 {title}
          </LatestArticles__Link>
        </LatestArticles__Title>
      )
    })}
  </LatestArticles>
)

export default props => (
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
                date(formatString: "MMMM DD, YYYY")
                title
                description
              }
            }
          }
        }
      }
    `}
    render={data => <Latest data={data} {...props} />}
  />
)
