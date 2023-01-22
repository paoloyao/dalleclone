import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }: { data: Post[], title: string }) => {
  if(data?.length === 0)
    return (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{ title }</h2>
    );

  return <>{data.map((post: Post) => (
    <Card key={post._id} {...post} />
  ))}</>
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState<Post[] | []>([]);
  const [searchTimeout, setSearchTimeout] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: abortController.signal,
        });
        if(response.ok){
          const result = await response.json();
          setAllPost(result.data.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    return () => abortController.abort();
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults: Post[] | [] = allPost.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())
          || item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
    
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase</h1>
        <p className='mt-2 text-[#666e75 text-[16px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
        </p>
      </div>
      <div className='mt-16'>
        <FormField
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='foont-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#222328]'>{ searchText }</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No search results found'
                />
              ) : (
                <RenderCards
                  data={allPost}
                  title='No posts found'
                />
              )}
            </div>
          </>
        ) }
      </div>
    </section>
  )
}

export default Home