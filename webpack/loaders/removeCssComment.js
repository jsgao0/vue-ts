module.exports = function loader(source) {
  const splitComment = source.split(/\/\*|\*\//)
  return splitComment.filter((e, i) => i % 2 === 0).join('')
}
