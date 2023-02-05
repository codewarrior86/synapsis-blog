import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import Router from 'next/router';
import { postsAPI } from './api/api.config'
import axios from 'axios'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [items, setItems] = useState([]);
  let limit = 12;

  useEffect(() => {
    const firstFetchPosts = async () => {
      let first = await fetchPosts(1);
      setItems(first)
    }
    firstFetchPosts();
  }, [])


  // fetch posts
  const fetchPosts = async (currentPage) => {
    const res = await axios.get(
      `${postsAPI}?page=${currentPage}&per_page=${limit}`
    );
    const data = await res.data;
    return data;
  };  

  // pagination
  const handlePageClick = async (data) => {
    console.log("data")
    console.log(data)
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchPosts(currentPage);
    setItems(commentsFormServer);
  };

  return (
    <>
      <Layout>
        <section>
          <div
            className='parallaxImg'
            style={{ backgroundImage: `url('../img/corp.jpg')` }}
          >
            <div className='layer'>
              <h1 className='titleHero'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, numquam.</h1>
            </div>
          </div>
        </section>

        <section className='container wrapRecentPosts'>
          <h2 className='section_title'>Recent Posts</h2>
          <div className='divider' />
          <div className="wrapperCard">
            {items?.map((item) => {
              return (
                <Card
                  img="../img/gallery.jpg"
                  alt=""
                  title={item.title}
                  desc={item.body}
                  ava="../img/gallery.jpg"
                  namaUser="Anonymous"
                  time="02-02-2023"
                  onClick={() => {
                    Router.push(`/detail_post/${item.id}`)
                  }}
                />
              );
            })}
          </div>
        </section>

        <section>
          <ReactPaginate
            previousLabel="< Prev"
            nextLabel="Next >"
            breakLabel="..."
            pageCount={15}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}

            containerClassName="pagination"

            pageClassName="page-item"
            pageLinkClassName="page-link"

            previousClassName="page-item"
            previousLinkClassName="page-link"

            nextClassName="page-item"
            nextLinkClassName="page-link"

            disabledClassName="pagination__link--disabled"
            activeClassName="pagination__link--active"
          />
        </section>
      </Layout>
    </>
  )
}
