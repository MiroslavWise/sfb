"use client"

import Image from "next/image"
import styles from "./style.module.scss"
import { TagCategory } from "@/components/pages/proposals/components/TagCategory"

export default function AboutProposals() {
    return (
        <div className={styles.wrapper}>
            <div data-images>
                <Image
                    src="/png/photo.png"
                    alt="photo"
                    width={450}
                    height={450}
                    unoptimized
                />
                <div data-scope-images>
                    <Image
                        data-active
                        src="/png/photo.png"
                        alt="photo"
                        width={450}
                        height={450}
                        unoptimized
                    />
                    <Image
                        src="/png/photo.png"
                        alt="photo"
                        width={450}
                        height={450}
                        unoptimized
                    />
                    <Image
                        src="/png/photo.png"
                        alt="photo"
                        width={450}
                        height={450}
                        unoptimized
                    />
                    <Image
                        src="/png/photo.png"
                        alt="photo"
                        width={450}
                        height={450}
                        unoptimized
                    />
                    <Image
                        src="/png/photo.png"
                        alt="photo"
                        width={450}
                        height={450}
                        unoptimized
                    />
                </div>
            </div>
            <div data-description>
                <div data-sub-description>
                    <div data-title>
                        <h1>Бампер, перед, Toyota Land Cruiser Prado</h1>
                        <p>г. Алматы</p>
                    </div>
                    <div data-tags>
                        <TagCategory text="Автозапчасти" />
                        <TagCategory text="Toyota" />
                        <TagCategory text="Toyota" />
                        <TagCategory text="Toyota" />
                        <TagCategory text="Toyota" />
                        <TagCategory text="Toyota" />
                        <TagCategory text="Toyota" />
                        <TagCategory text="Toyota" />
                        <TagCategory text="Бампер" />
                    </div>
                    <div data-short-description>
                        <h4>Краткое описание</h4>
                        <a>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Est sit amet facilisis magna
                            etiam tempor orci eu lobortis. A cras semper auctor
                            neque vitae tempus.
                        </a>
                    </div>
                </div>
                <div data-author-price>
                    <div data-author>
                        <h2>Продавец</h2>
                        <div data-sailer>
                            <div data-avatar />
                            <div data-names-rating>
                                <p>Эмизандирадин А.</p>
                                <div data-rating>
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <Image
                                            key={`${item}-$ra`}
                                            src="/svg/shape.svg"
                                            alt="shape"
                                            width={16}
                                            height={16}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-price-block>
                        <h5>Стоимость</h5>
                        <h3>85 000 ₸</h3>
                    </div>
                    <footer>
                        <button data-primary>
                            <span>Написать продавцу</span>
                        </button>
                        <button data-not>
                            <span>Добавить в избранные</span>
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    )
}
