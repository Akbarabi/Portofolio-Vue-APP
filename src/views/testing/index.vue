<template>
    <div class="flex flex-col space-y-4">
        <div>
            <Button> Default Button </Button>
        </div>

        <div>
            <Button variant="solid"> Solid Button </Button>
            <Button variant="outline"> Outline Button </Button>
            <Button variant="ghost"> Ghost Button </Button>
        </div>

        <div>
            <Button color="primary"> Primary </Button>
            <Button color="secondary"> Secondary </Button>
            <Button color="success"> Success </Button>
            <Button color="danger"> Danger </Button>
            <Button color="error"> Error </Button>
        </div>

        <div>
            <Button size="xs"> Extra Small </Button>
            <Button size="sm"> Small </Button>
            <Button size="md"> Medium </Button>
            <Button size="lg"> Large </Button>
            <Button size="xl"> Extra Large </Button>
        </div>

        <div>
            <Button rounded="xs"> Rounded XS </Button>
            <Button rounded="sm"> Rounded SM </Button>
            <Button rounded="md"> Rounded MD </Button>
            <Button rounded="lg"> Rounded LG </Button>
            <Button rounded="xl"> Rounded XL </Button>
            <Button rounded="2xl"> Rounded 2XL </Button>
            <Button rounded="full"> Rounded FULL </Button>
        </div>

        <div>
            <Button disabled> Disabled Button </Button>
            <Button loading> Loading... </Button>
        </div>

        <div>
            <Button>
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                With Icon
            </Button>
        </div>

        <div>
            <Button @click="handleClick"> Click Me </Button>
            <Button @click="handleClickSuccess"> Success Toast </Button>
            <Button @click="handleClickError"> Error Toast </Button>
            <Button @click="handleClickConfirm"> Confirm Toast </Button>
        </div>
    </div>
</template>

<script setup>
import Button from "../../components/widgets/button.vue";
import { showSuccessToast, showErrorToast, showDeleteConfirmationDialog } from "@/helpers/alert";

const handleClick = () => {
    alert("Button Clicked!");
};

const handleClickSuccess = () => {
    showSuccessToast("Success Toast");
};

const handleClickError = () => {
    showErrorToast("Error Toast");
};

const handleClickConfirm = () => {
    showDeleteConfirmationDialog("Confirm Toast");
};
</script>
