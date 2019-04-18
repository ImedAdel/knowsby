import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
// import { rhythm } from "../utils/typography"
import _ from "lodash"
import styled from "styled-components"
import tw from "tailwind.macro"

// const TopicWrapper = styled.div`
// //   ${tw`w-full md:w-1/2 lg:w-1/3 mb-8 pl-8`};
// `
const TopicsList = styled.div`
  ${tw`w-1/5`};
`
const TopicName = styled.h3`
  ${tw`text-base  font-normal font-body leading-tight max-w-xs w-auto mb-2`};
`
const Title = styled.h2`
  ${tw`text-3xl mb-4`};
`
const StyledLink = styled(Link)`
  ${tw`no-underline text-grey-darker hover:text-grey-darkest hover:underline`};
`
const Topics = ({ data }) => {
  // let topics = []

  // _.each(data.allMarkdownRemark.edges, edge => {
  //   if (_.get(edge, "node.frontmatter.topic")) {
  //     topics = topics.concat(edge.node.frontmatter.topic)
  //   }
  // })

  // topics = _.uniq(topics)
  return (
    <TopicsList>
      <Title>🗄️ Topics</Title>
      {data.allMarkdownRemark.group.map(topic => (
        <TopicName>
          <StyledLink to={`topics/${_.kebabCase(topic.fieldValue)}`}>
            📁 {topic.fieldValue} ({topic.totalCount})
          </StyledLink>
        </TopicName>
      ))}
    </TopicsList>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___topic) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => <Topics data={data} {...props} />}
  />
)

/* TODO: Use this query instead!!!
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___topic) {
        fieldValue
        totalCount
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
  */
