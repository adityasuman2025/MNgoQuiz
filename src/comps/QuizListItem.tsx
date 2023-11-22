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
            className='mngo-quiz-card mngo-flex mngo-justify-between mngo-items-center mngo-p-5 mngo-rounded-lg mngo-mb-1 mngo-cursor-pointer mngo-w-60 sm:mngo-w-80'
            onClick={onClick}
        >
            <figure>
                <img src={quizIcon} alt="quiz" className='mngo-quiz-icon' width={50} height={50} />
            </figure>
            <div className='mngo-flex-1 mngo-ml-4 mngo-text-left'>
                <h3 className=''>{quizTitle}</h3>
                <p className='mngo-text-sm'>{quizDescription}</p>
            </div>
        </li>
    )
}