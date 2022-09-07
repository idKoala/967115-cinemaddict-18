export const TOTAL_COMMENTS = 100;

const generateComment = () => ({
  'author': 'Ilya O\'Reilly',
  'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': 'smile'
});


export const generateComments = () => {
  return Array.from(
    {length: TOTAL_COMMENTS},
    (_value, index) => {
      const commentItem = generateComment();

      return {
        id: index + 1,
        ...commentItem,
      };
    }
  );
}