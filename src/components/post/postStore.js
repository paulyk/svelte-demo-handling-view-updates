import { writable } from 'svelte/store'

const post_data = [
  {
    id: '1122',
    title: 'Post Title 1',
    content: 'here is the content for post 1122'
  },
  {
    id: '3344',
    title: 'Post Title 2',
    content: 'here is the content for post 3344'
  }
]

let _store = {
  post: {
    id: '',
    title: '',
    content: ''
  },
  status: 'unknown'
}

export let postStore = writable(_store)

const delay = (ms = 500) => new Promise(res => setTimeout(res, ms))

const storeActions = {
  setStatus(status) {
    postStore.update(store => {
      store.status = status
      return store
    })
  },
  setPost(post) {
    postStore.update(store => {
      store.status = 'done'
      store.post = post
      return store
    })
  }
}

const localCache = {
	async getPost(id) {
		await delay()
		let post = post_data.find(x => x.id === id)
		console.log('post from cache', post);
		return post
	}
}

const remoteData = {
	async getPost(id) {
		await delay()
		let post = post_data.find(x => x.id === id)
		console.log('post from remote service', post);
		return post
	}
}

export const actions = {
  async loadPost(postId) {
		let post = null
		console.log('postId', postId);
    await delay()
    storeActions.setStatus('loading')
    let inCache = await postInCache()
    await delay()
    if (inCache) {
			storeActions.setStatus('reading from cache')
			post = await localCache.getPost(postId)			
    } else {
			storeActions.setStatus('reading from service')
			post = await remoteData.getPost(postId)			
    }
    if (!post) {
      storeActions.setStatus('not-found')
    } else {
      storeActions.setPost(post)
    }
  }
}

async function postInCache() {
  await delay()
  return Math.random() > 0.5
}

