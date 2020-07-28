import {actions, follow, unfollow} from './users-reducer'
import {usersAPI} from '../api/users-api'
import {APIResponseType, ResultCodesEnum} from '../api/api'

jest.mock('../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()


const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

describe('follow/unfollow thunks tests', function () {

    afterEach(() => {
        dispatchMock.mockClear()
        getStateMock.mockClear()
    })

    it('follow thunk should be call a dispatch 3 times', async () => {
        const thunk = follow(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
    })

    it('unfollow thunk should be call a dispatch 3 times', async () => {
        const thunk = unfollow(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
    })
})