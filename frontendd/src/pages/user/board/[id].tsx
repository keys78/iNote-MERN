import React from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const BoardDetails = () => {
  const router = useRouter();
  const query = JSON.stringify(router.query.id);

  return (
    <Layout>
      <div>{query}</div>
      <div className='flex items-center justify-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quia nihil autem odio obcaecati, beatae modi eveniet molestiae incidunt quibusdam rerum consequuntur
        quas, enim ut aliquam placeat totam quo porro distinctio similique cumque illo molestias! Nihil adipisci ab, soluta veritatis quam perferendis
        doloremque vero nam recusandae suscipit. Voluptatum adipisci autem mollitia eos molestias, tempore obcaecati id magnam deleniti inventore consectetur delectus sint beatae aperiam, animi sapiente veritatis
        ipsa! Omnis, numquam esse eum alias distinctio cupiditate ipsam recusandae totam doloribus facere error exercitationem cum adipisci, repellendus cumque culpa
        expedita harum perferendis quo pariatur nihil, quis iusto illo deserunt. Non, necessitatibus quidem!
      </div>
    </Layout>
  )
}

export default BoardDetails