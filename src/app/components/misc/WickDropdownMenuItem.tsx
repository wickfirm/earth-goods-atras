import React from 'react';
import {DropdownItemType} from '../../helpers/variables';
import {WickDropdownItem} from '../buttons/WickDropdownMenu.tsx';

export class WickMenuItem {
    type: DropdownItemType;
    text: string;

    constructor(type: DropdownItemType, text: string) {
        this.type = type;
        this.text = text;
    }

    getHtmlComponent(): JSX.Element {
        return (<></>);
    }
}

export class LinkMenuItem extends WickMenuItem {
    url: string;

    constructor(text: string, url: string) {
        super(DropdownItemType.URL, text);

        this.url = url;
    }

    getHtmlComponent(index?: number, color: string = 'twfirm'): JSX.Element {
        return (
            <WickDropdownItem type={this.type} text={this.text} url={this.url} key={index} color={color}/>
        );
    }
}

export class ButtonMenuItem extends WickMenuItem {
    onClickHandler: any;
    onClickParams: any[];

    constructor(text: string, onClickHandler: any, onClickParams: any[]) {
        super(DropdownItemType.ACTION, text);

        this.onClickHandler = onClickHandler;
        this.onClickParams = onClickParams;
    }

    getHtmlComponent(index?: number, color: string = 'twfirm'): JSX.Element {
        return (
            <WickDropdownItem type={this.type} text={this.text} onClickHandler={this.onClickHandler}
                              onClickParams={this.onClickParams} key={index}
                              color={color}/>
        );
    }
}