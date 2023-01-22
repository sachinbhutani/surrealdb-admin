export const ssr =false;
 
export const load = (({ params }) => {
  return {
      tableName: params.slug 
  }
})