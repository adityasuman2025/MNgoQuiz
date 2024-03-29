import quizIcon from '../imgs/quiz.png';

export default function QuizListItem({
    quizTitle,
    quizDescription = "",
    onClick = () => { }
}: {
    quizTitle: string,
    quizDescription?: string,
    onClick?: () => void
}) {
    return (
        <li
            className='mngo-transp-bckgrnd mngo-flex mngo-justify-between mngo-items-center md:mngo-p-4 mngo-p-3 mngo-rounded-lg mngo-mb-1 mngo-cursor-pointer mngo-list-none'
            onClick={onClick}
        >
            <figure>
                <img src={quizIcon} alt="quiz" className='mngo-quiz-icon' width={45} height={45} />
            </figure>
            <div className='mngo-flex-1 mngo-ml-4 mngo-text-left mngo-text-white'>
                <h4>{quizTitle}</h4>
                <p className='mngo-text-sm'>{quizDescription}</p>
            </div>
        </li>
    )
}